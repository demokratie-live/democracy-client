import React from "react";
import { router } from "expo-router";
import styled from "styled-components/native";
import type { MonthlyDonationStatus } from "../../api/donations/types";
import { formatLongDate } from "../../lib/formatDate";
import { formatEuro } from "../../lib/formatEuro";
import { SecondaryButton } from "./SecondaryButton";

const Card = styled.View`
  margin-top: 18px;
  margin-horizontal: 18px;
  padding: 16px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e3e3e3;
  background-color: #f7fafd;
`;

const Headline = styled.Text`
  font-weight: bold;
  font-size: 15px;
  color: #333;
`;

const Amount = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #333;
  margin-top: 6px;
`;

const Line = styled.Text<{ warning?: boolean }>`
  font-size: 14px;
  color: ${({ warning }) => (warning ? "#d0021b" : "#555")};
  margin-top: 4px;
`;

/** Kurzer Statussatz für Karte und Verwaltung. */
export const statusLine = (status: MonthlyDonationStatus): { text: string; warning: boolean } => {
  const date = formatLongDate(status.currentPeriodEnd);
  if (status.status === "past_due") {
    return { text: "Die letzte Abbuchung ist fehlgeschlagen.", warning: true };
  }
  if (status.cancelAtPeriodEnd) {
    return { text: date ? `Gekündigt – läuft noch bis zum ${date}.` : "Gekündigt.", warning: false };
  }
  if (status.firstPaymentPending) {
    return { text: "Deine erste Spende wird gerade eingezogen.", warning: false };
  }
  return { text: date ? `Nächste Abbuchung am ${date}.` : "Aktiv.", warning: false };
};

interface Props {
  status: MonthlyDonationStatus;
}

/** T055: „Deine Dauerspende" auf dem Spenden-Screen, sobald auf diesem Gerät eine läuft. */
export const MonthlyCard: React.FC<Props> = ({ status }) => {
  const line = statusLine(status);
  return (
    <Card testID="donate-monthly-card">
      <Headline>Deine Dauerspende</Headline>
      <Amount>{`${formatEuro(status.amountCents)} monatlich`}</Amount>
      <Line warning={line.warning}>{line.text}</Line>
      <SecondaryButton
        label="Dauerspende verwalten"
        onPress={() => router.push("/DonateManage")}
        testID="donate-monthly-manage"
      />
    </Card>
  );
};
