import React from "react";
import { router } from "expo-router";
import styled from "styled-components/native";
import { formatEuro } from "../../lib/formatEuro";

/** FR-010: Danke-Bildschirm mit Betrag, Rhythmus und Status („erfolgreich" bzw. „wird eingezogen"). */

const Container = styled.ScrollView.attrs({
  contentContainerStyle: { flexGrow: 1, padding: 24, justifyContent: "center" },
})`
  flex: 1;
  background-color: #fff;
`;

const Heart = styled.Text`
  font-size: 56px;
  text-align: center;
`;

const Headline = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin-top: 12px;
`;

const Body = styled.Text`
  font-size: 16px;
  line-height: 23px;
  text-align: center;
  color: #555;
  margin-top: 14px;
`;

const Done = styled.TouchableOpacity`
  margin-top: 32px;
  height: 52px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: #4494d3;
`;

const DoneText = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`;

interface Props {
  status: "succeeded" | "processing";
  interval: "one_time" | "monthly";
  chargedAmountCents: number;
}

export const ThankYou: React.FC<Props> = ({ status, interval, chargedAmountCents }) => {
  const amount = formatEuro(chargedAmountCents);
  const what = interval === "monthly" ? `Deine monatliche Spende über ${amount}` : `Deine Spende über ${amount}`;
  const detail =
    status === "processing"
      ? `${what} wird per Lastschrift eingezogen. Das kann einige Werktage dauern.`
      : `${what} ist erfolgreich bei uns eingegangen.`;

  return (
    <Container>
      <Heart accessibilityElementsHidden importantForAccessibility="no">
        💙
      </Heart>
      <Headline accessibilityRole="header">Danke für deine Unterstützung!</Headline>
      <Body testID="donate-thanks-status">{detail}</Body>
      <Body>
        Damit bleibt DEMOCRACY unabhängig, überparteilich und werbefrei. Falls du eine E-Mail-Adresse angegeben
        hast, schicken wir dir eine Bestätigung für das Finanzamt.
      </Body>
      <Done onPress={() => router.back()} accessibilityRole="button" testID="donate-thanks-done">
        <DoneText>Fertig</DoneText>
      </Done>
    </Container>
  );
};
