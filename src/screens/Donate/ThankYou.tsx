import React from "react";
import { Platform } from "react-native";
import { router } from "expo-router";
import styled from "styled-components/native";
import { AppLogo } from "../../components/AppLogo";
import { Button } from "../../components/Button";
import { formatLongDate } from "../../lib/formatDate";
import { formatEuro } from "../../lib/formatEuro";

/**
 * FR-010: Danke-Bildschirm mit Betrag, Rhythmus und Status („erfolgreich" bzw. „wird eingezogen").
 * Gestaltet wie der Spenden-Screen nach der SMS-Verifikation (src/screens/Verification/Donate.tsx).
 */

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
}))`
  flex: 1;
  background: #fff;
  padding-top: ${() => (Platform.OS === "ios" ? 60 : 44)}px;
  padding-horizontal: 18px;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22px;
  padding-top: 25px;
  text-align: center;
`;

// Abstände wie im Verifikations-Screen; ohne flex, damit der Button direkt unter dem Text steht
const TextCenter = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: 17px;
  padding-top: 50px;
  text-align: center;
  padding-bottom: 18px;
`;

const TextNormal = styled.Text``;

const TextBold = styled.Text`
  font-weight: bold;
`;

const ButtonContainer = styled.View`
  width: 100%;
  padding-horizontal: 25px;
  padding-bottom: 25px;
`;

interface Props {
  status: "succeeded" | "processing";
  interval: "one_time" | "monthly";
  chargedAmountCents: number;
  /** Nur anzeigen, wenn wirklich eine Bestätigungsmail verschickt wird (E-Mail angegeben) */
  confirmationMailed: boolean;
  /** Dauerspende: nächster Abbuchungstermin (T045) */
  nextChargeAt?: Date | null;
}


export const ThankYou: React.FC<Props> = ({
  status,
  interval,
  chargedAmountCents,
  confirmationMailed,
  nextChargeAt,
}) => {
  const amount = formatEuro(chargedAmountCents);
  const subject = interval === "monthly" ? "Deine monatliche Spende über " : "Deine Spende über ";
  const outcome =
    status === "processing"
      ? " wird per Lastschrift eingezogen. Das kann einige Werktage dauern."
      : interval === "monthly"
        ? " ist eingerichtet."
        : " ist erfolgreich bei uns eingegangen.";

  return (
    <Container>
      <AppLogo />
      <TextHead accessibilityRole="header">{"Vielen Dank für\nDeine Unterstützung!"}</TextHead>
      <TextCenter testID="donate-thanks-status">
        <TextNormal>{subject}</TextNormal>
        <TextBold>{amount}</TextBold>
        <TextNormal>{outcome}</TextNormal>
        {interval === "monthly" && nextChargeAt && (
          <TextNormal>{` Die nächste Abbuchung ist am ${formatLongDate(nextChargeAt)}.`}</TextNormal>
        )}
        <TextNormal>
          {
            "\n\nJede Spende hilft dem DEMOCRACY Deutschland e.V., seine unabhängige, überparteiliche und gemeinnützige demokratische Arbeit voranzubringen."
          }
        </TextNormal>
        {confirmationMailed && <TextNormal>{"\n\nWir schicken Dir eine Bestätigung per Mail."}</TextNormal>}
      </TextCenter>
      <ButtonContainer>
        <Button
          // Sonderfall: Ersetzte der Danke-Screen den Startbildschirm, gibt es kein „zurück".
          onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))}
          textColor="white"
          backgroundColor="blue"
          text="FERTIG"
          testID="donate-thanks-done"
        />
      </ButtonContainer>
    </Container>
  );
};
