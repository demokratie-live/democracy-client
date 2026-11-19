import React, { useState } from "react";
import styled from "styled-components/native";
import type { DonationConfig, DonationInterval } from "../../../api/donations/types";
import { chargedAmountCents, feeSurchargeCents } from "../../../lib/donationFees";
import { formatEuro, formatEuroShort } from "../../../lib/formatEuro";
import { linking } from "../../../lib/linking";
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
}

export const DonationForm: React.FC<Props> = ({ config, onCompleted }) => {
  const { donate } = usePaymentSheetDonation();
  const [interval, setInterval] = useState<DonationInterval>(config.defaultInterval);
  const [amountCents, setAmountCents] = useState<number | null>(config.presets[config.defaultInterval][0] ?? null);
  const [coverFees, setCoverFees] = useState(false);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeInterval = (next: DonationInterval) => {
    setInterval(next);
    setAmountCents(config.presets[next][0] ?? null);
    setError(null);
  };

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
    if (!amountValid || !emailValid || busy) return;
    setBusy(true);
    setError(null);
    const outcome = await donate({
      interval,
      amountCents,
      chargedAmountCents: charged,
      coverFees,
      email: trimmedEmail || null,
      config,
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
      <DonateButton label={buttonLabel} onPress={submit} disabled={!amountValid || !emailValid} busy={busy} />
      <Info>
        Empfänger: {config.merchantDisplayName}, gemeinnützig – Deine Spende ist steuerlich absetzbar. Die Zahlung
        wickelt Stripe ab. <Link onPress={linking(config.legal.privacyUrl)}>Datenschutz</Link>
      </Info>
    </>
  );
};
