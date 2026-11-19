import React, { useEffect, useRef, useState } from "react";
import { useNavigation } from "expo-router";
import styled from "styled-components/native";
import type { DonationConfig, DonationInterval } from "../../../api/donations/types";
import { chargedAmountCents, feeSurchargeCents } from "../../../lib/donationFees";
import { formatEuro, formatEuroShort } from "../../../lib/formatEuro";
import { linking } from "../../../lib/linking";
import { useAnnounce } from "../useAnnounce";
import { usePaymentSheetDonation, type DonationOutcome } from "../usePaymentSheetDonation";
import { AmountPicker } from "./AmountPicker";
import { CoverFeesToggle } from "./CoverFeesToggle";
import { DonateButton } from "./DonateButton";
import { EmailField } from "./EmailField";
import { IntervalToggle } from "./IntervalToggle";

const Headline = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #333;
  margin-bottom: 10px;
`;

const Section = styled.View`
  margin-top: 14px;
`;

const Hint = styled.Text`
  font-size: 14px;
  color: #b05c00;
  margin-top: 8px;
`;

const ErrorText = styled.Text`
  font-size: 14px;
  color: #d0021b;
  margin-top: 12px;
`;

const Info = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 14px;
  line-height: 18px;
`;

const Link = styled.Text`
  color: #4494d3;
  text-decoration-line: underline;
`;

// Pragmatische Prüfung wie auf dem Server (democracy-api validation.ts)
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type CompletedDonation = Extract<DonationOutcome, { status: "succeeded" | "processing" }> & {
  /** true, wenn in der App eine E-Mail angegeben wurde – dann kommt eine Bestätigungsmail */
  emailProvided: boolean;
};

interface Props {
  config: DonationConfig;
  onCompleted: (donation: CompletedDonation) => void;
  /** Auf diesem Gerät läuft schon eine Dauerspende (T055) – eine zweite ist gesperrt. */
  monthlyBlocked?: boolean;
}

export const DonationForm: React.FC<Props> = ({ config, onCompleted, monthlyBlocked = false }) => {
  const { donate } = usePaymentSheetDonation();
  const navigation = useNavigation();
  const [interval, setInterval] = useState<DonationInterval>(config.defaultInterval);
  const [amountCents, setAmountCents] = useState<number | null>(config.presets[config.defaultInterval][0] ?? null);
  const [coverFees, setCoverFees] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalTouched = useRef(false);
  useAnnounce(error);

  const changeInterval = (next: DonationInterval, byUser = true) => {
    intervalTouched.current ||= byUser;
    setInterval(next);
    setAmountCents(config.presets[next][0] ?? null);
    setError(null);
  };

  // Läuft schon eine Dauerspende, starten wir mit „einmalig" – solange noch nichts angetippt wurde.
  useEffect(() => {
    if (monthlyBlocked && !intervalTouched.current) changeInterval("one_time", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyBlocked]);
  const blocked = monthlyBlocked && interval === "monthly";

  const belowMin = amountCents !== null && amountCents < config.minAmountCents;
  const aboveMax = amountCents !== null && amountCents > config.maxAmountCents;
  const amountValid = amountCents !== null && !belowMin && !aboveMax;
  const trimmedEmail = email.trim();
  const emailValid = trimmedEmail === "" ? interval === "one_time" : EMAIL.test(trimmedEmail);

  const charged = amountValid ? chargedAmountCents(amountCents, { coverFees, interval }, config.fees) : 0;
  const surcharge = amountValid ? feeSurchargeCents(amountCents, interval, config.fees) : 0;
  const buttonLabel = !amountValid
    ? "Spenden"
    : interval === "monthly"
      ? `${formatEuro(charged)} monatlich spenden`
      : `${formatEuro(charged)} spenden`;

  const submit = async () => {
    if (!amountValid || !emailValid || busy || blocked) return;
    setBusy(true);
    setError(null);
    const outcome = await donate({
      interval,
      amountCents,
      chargedAmountCents: charged,
      coverFees,
      email: trimmedEmail || null,
      config,
      // Wurde der Screen während der Vorbereitung verlassen, öffnet sich kein Zahlungsfenster mehr.
      isActive: () => navigation.isFocused(),
    });
    setBusy(false);
    if (outcome.status === "failed") setError(outcome.message);
    if (outcome.status === "succeeded" || outcome.status === "processing") {
      onCompleted({ ...outcome, emailProvided: trimmedEmail !== "" });
    }
  };

  return (
    <>
      <Headline>Direkt in der App spenden</Headline>
      <IntervalToggle value={interval} onChange={changeInterval} disabled={busy} />
      <Section>
        <AmountPicker
          key={interval}
          presets={config.presets[interval]}
          valueCents={amountCents}
          onChange={setAmountCents}
          disabled={busy}
        />
        {belowMin && (
          <Hint testID="donate-hint-min">
            In der App ab {formatEuroShort(config.minAmountCents)}. Kleinere Beträge gerne per Dauerauftrag oder
            Überweisung – das ist für uns gebührenfrei (Bankverbindung unten).
          </Hint>
        )}
        {aboveMax && (
          <Hint testID="donate-hint-max">
            Für Spenden über {formatEuroShort(config.maxAmountCents)} nutze bitte die Überweisung (Bankverbindung
            unten).
          </Hint>
        )}
      </Section>
      {amountValid && (
        <CoverFeesToggle value={coverFees} onChange={setCoverFees} surchargeCents={surcharge} disabled={busy} />
      )}
      <EmailField value={email} onChange={setEmail} required={interval === "monthly"} disabled={busy} />
      {trimmedEmail !== "" && !emailValid && <Hint>Bitte prüfe die E-Mail-Adresse.</Hint>}
      {error && <ErrorText accessibilityLiveRegion="polite">{error}</ErrorText>}
      {blocked && (
        <Hint testID="donate-hint-monthly-exists">
          Du hast bereits eine Dauerspende. Den Betrag ändern oder kündigen kannst Du oben unter „Dauerspende
          verwalten". Nach einer Kündigung kannst Du hier direkt eine neue einrichten.
        </Hint>
      )}
      <DonateButton
        label={buttonLabel}
        onPress={submit}
        disabled={!amountValid || !emailValid || blocked}
        busy={busy}
      />
      <Info>
        Empfänger: {config.merchantDisplayName}, gemeinnützig – Deine Spende ist steuerlich absetzbar. Die Zahlung
        wickelt Stripe ab. <Link accessibilityRole="link" onPress={linking(config.legal.privacyUrl)}>
          Datenschutz
        </Link>
      </Info>
    </>
  );
};
