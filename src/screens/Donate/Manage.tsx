import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { router } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import styled from "styled-components/native";
import { useDonationConfig } from "../../api/donations/useDonationConfig";
import { useMonthlyDonation } from "../../api/donations/useMonthlyDonation";
import { chargedAmountCents, feeSurchargeCents } from "../../lib/donationFees";
import { formatLongDate } from "../../lib/formatDate";
import { formatEuro } from "../../lib/formatEuro";
import { AmountPicker } from "./DonationForm/AmountPicker";
import { CoverFeesToggle } from "./DonationForm/CoverFeesToggle";
import { DonateButton } from "./DonationForm/DonateButton";
import { statusLine } from "./MonthlyCard";
import { SecondaryButton } from "./SecondaryButton";
import { useAnnounce } from "./useAnnounce";

/**
 * T054: Dauerspende verwalten – Status, Betrag ändern, Zahlungsart (Stripe-Kundenportal), kündigen.
 * Kündigen braucht vom Spenden-Screen aus 3 Interaktionen: „Verwalten" → „Kündigen" → Bestätigen.
 */

const Scroll = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

const Content = styled.View`
  padding: 18px;
  padding-bottom: 36px;
`;

const Title = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

const Amount = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-top: 6px;
`;

const Muted = styled.Text`
  font-size: 14px;
  color: #777;
  margin-top: 4px;
  line-height: 20px;
`;

const StatusBox = styled.View<{ warning: boolean }>`
  margin-top: 14px;
  padding: 12px;
  border-radius: 6px;
  background-color: ${({ warning }) => (warning ? "#fdecee" : "#eaf3fb")};
`;

const StatusText = styled.Text<{ warning: boolean }>`
  font-size: 15px;
  color: ${({ warning }) => (warning ? "#a1001a" : "#244a6b")};
  line-height: 21px;
`;

const Section = styled.View`
  margin-top: 26px;
`;

const SectionTitle = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const Body = styled.Text`
  font-size: 15px;
  color: #333;
`;

const Notice = styled.Text<{ error?: boolean }>`
  font-size: 14px;
  color: ${({ error }) => (error ? "#d0021b" : "#2e7d32")};
  margin-top: 12px;
`;

const CancelLink = styled.TouchableOpacity`
  margin-top: 30px;
  padding-vertical: 10px;
  align-items: center;
`;

const CancelText = styled.Text`
  font-size: 16px;
  color: #d0021b;
`;

const Center = styled.View`
  padding: 36px 18px;
  align-items: center;
`;

export const ManageMonthlyDonation: React.FC = () => {
  const { config } = useDonationConfig();
  const { loading, status, error, busy, refresh, updateAmount, cancel, openPortal } = useMonthlyDonation();
  const [amountCents, setAmountCents] = useState<number | null>(null);
  const [coverFees, setCoverFees] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  useAnnounce(notice ?? actionError);

  // Formular mit dem aktuellen Betrag vorbelegen (auch nach dem Speichern).
  useEffect(() => {
    if (status) {
      setAmountCents(status.baseAmountCents);
      setCoverFees(status.coverFees);
    }
  }, [status]);

  if (!status) {
    return (
      <Scroll>
        <Center>
          {loading && <ActivityIndicator />}
          {!loading && error && (
            <>
              <Body style={{ textAlign: "center" }}>{error}</Body>
              <SecondaryButton label="Erneut versuchen" onPress={refresh} />
            </>
          )}
          {!loading && !error && (
            <>
              <Body style={{ textAlign: "center" }}>Auf diesem Gerät ist keine Dauerspende hinterlegt.</Body>
              {config.portalLoginUrl && (
                <>
                  <Muted style={{ textAlign: "center", marginTop: 12 }}>
                    Du hast Deine Dauerspende auf einem anderen Gerät eingerichtet? Mit dem Link aus Deiner
                    Willkommens-Mail kannst Du sie auch hier verwalten.
                  </Muted>
                  <SecondaryButton
                    label="Per E-Mail-Link anmelden"
                    onPress={() => WebBrowser.openBrowserAsync(config.portalLoginUrl as string)}
                  />
                </>
              )}
            </>
          )}
        </Center>
      </Scroll>
    );
  }

  const ended = status.status === "canceled" || status.status === "incomplete_expired";
  const changeable = status.status === "active" && !status.cancelAtPeriodEnd;
  const cancelable = (status.status === "active" && !status.cancelAtPeriodEnd) || status.status === "past_due";
  const endDate = formatLongDate(status.currentPeriodEnd);
  const line = ended ? { text: "Deine Dauerspende ist beendet.", warning: false } : statusLine(status);

  const amountValid =
    amountCents !== null && amountCents >= config.minAmountCents && amountCents <= config.maxAmountCents;
  const newCharged = amountValid ? chargedAmountCents(amountCents, { coverFees, interval: "monthly" }, config.fees) : 0;
  const surcharge = amountValid ? feeSurchargeCents(amountCents, "monthly", config.fees) : 0;
  const unchanged = amountCents === status.baseAmountCents && coverFees === status.coverFees;

  const act = async (request: () => Promise<string | null>, success: string | null) => {
    setNotice(null);
    setActionError(null);
    const failure = await request();
    if (failure) setActionError(failure);
    else if (success) setNotice(success);
  };

  const saveAmount = () => {
    if (!amountValid || unchanged) return;
    act(
      () => updateAmount(amountCents, coverFees),
      `Gespeichert. Ab der nächsten Abbuchung spendest Du ${formatEuro(newCharged)} im Monat.`,
    );
  };

  const confirmCancel = () => {
    const consequence =
      status.status === "active" && endDate
        ? `Deine Dauerspende läuft noch bis zum ${endDate}, danach buchen wir nichts mehr ab.`
        : "Deine Dauerspende endet sofort, es wird nichts mehr abgebucht.";
    Alert.alert("Dauerspende kündigen?", consequence, [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Kündigen",
        style: "destructive",
        onPress: () =>
          act(cancel, "Deine Kündigung ist angekommen. Wir schicken Dir eine Bestätigung per Mail."),
      },
    ]);
  };

  return (
    <Scroll keyboardShouldPersistTaps="handled" testID="donate-manage-screen">
      <Content>
        <Title>Deine Dauerspende</Title>
        <Amount>{`${formatEuro(status.amountCents)} monatlich`}</Amount>
        {status.coverFees && status.amountCents > status.baseAmountCents && (
          <Muted>{`inklusive ${formatEuro(status.amountCents - status.baseAmountCents)} Zahlungsgebühren`}</Muted>
        )}

        <StatusBox warning={line.warning}>
          <StatusText warning={line.warning} testID="donate-manage-status">
            {line.text}
            {status.status === "past_due" &&
              `${status.lastPaymentError ? ` ${status.lastPaymentError.message}` : ""} Bitte ändere Deine Zahlungsart – Stripe versucht die Abbuchung dann erneut.`}
            {status.firstPaymentPending && " Das kann einige Werktage dauern."}
          </StatusText>
        </StatusBox>

        {notice && <Notice accessibilityLiveRegion="polite">{notice}</Notice>}
        {actionError && (
          <Notice error accessibilityLiveRegion="polite">
            {actionError}
          </Notice>
        )}

        {ended ? (
          <SecondaryButton label="Neue Dauerspende einrichten" onPress={() => router.back()} />
        ) : (
          <>
            <Section>
              <SectionTitle>Zahlungsart</SectionTitle>
              <Body>{status.paymentMethod?.label ?? "Nicht hinterlegt"}</Body>
              <SecondaryButton
                label="Zahlungsart ändern"
                onPress={() => act(openPortal, null)}
                busy={busy === "portal"}
                disabled={busy !== null}
                testID="donate-manage-portal"
              />
              <Muted>Im Kundenportal unseres Zahlungsdienstleisters Stripe findest Du auch alle Belege.</Muted>
            </Section>

            {changeable && (
              <Section>
                <SectionTitle>Betrag ändern</SectionTitle>
                <AmountPicker
                  presets={config.presets.monthly}
                  valueCents={amountCents}
                  onChange={setAmountCents}
                  disabled={busy !== null}
                />
                {amountValid && (
                  <CoverFeesToggle
                    value={coverFees}
                    onChange={setCoverFees}
                    surchargeCents={surcharge}
                    disabled={busy !== null}
                  />
                )}
                <DonateButton
                  label={amountValid ? `${formatEuro(newCharged)} monatlich speichern` : "Betrag speichern"}
                  onPress={saveAmount}
                  disabled={!amountValid || unchanged || busy !== null}
                  busy={busy === "update"}
                  testID="donate-manage-save"
                />
                <Muted>Gilt ab der nächsten Abbuchung.</Muted>
              </Section>
            )}

            {cancelable && (
              <CancelLink
                onPress={confirmCancel}
                disabled={busy !== null}
                accessibilityRole="button"
                accessibilityLabel="Dauerspende kündigen"
                accessibilityState={{ disabled: busy !== null, busy: busy === "cancel" }}
                testID="donate-manage-cancel"
              >
                {busy === "cancel" ? <ActivityIndicator /> : <CancelText>Dauerspende kündigen</CancelText>}
              </CancelLink>
            )}
          </>
        )}
      </Content>
    </Scroll>
  );
};
