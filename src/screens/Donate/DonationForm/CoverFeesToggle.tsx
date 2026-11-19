import React from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import { formatEuro } from "../../../lib/formatEuro";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

const Label = styled.Text`
  flex: 1;
  font-size: 15px;
  color: #333;
  padding-right: 12px;
`;

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  surchargeCents: number;
  disabled?: boolean;
}

/** FR-001b: freiwillige Übernahme der Zahlungsgebühr – standardmäßig aus, Aufschlag sichtbar. */
export const CoverFeesToggle: React.FC<Props> = ({ value, onChange, surchargeCents, disabled }) => {
  const label =
    surchargeCents > 0 ? `Zahlungsgebühr übernehmen (+${formatEuro(surchargeCents)})` : "Zahlungsgebühr übernehmen";
  return (
    <Row>
      <Label>{label}</Label>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: "#4494d3", false: "#d6d6d6" }}
        accessibilityLabel={`${label}, damit Deine Spende vollständig bei DEMOCRACY ankommt`}
        testID="donate-cover-fees"
      />
    </Row>
  );
};
