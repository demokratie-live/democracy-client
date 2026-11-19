import React from "react";
import { Switch } from "react-native";
import styled from "styled-components/native";
import { formatEuro } from "../../../lib/formatEuro";

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 14px;
`;

const Texts = styled.View`
  flex: 1;
  padding-right: 12px;
`;

const Label = styled.Text`
  font-size: 15px;
  color: #333;
`;

const Hint = styled.Text`
  font-size: 13px;
  color: #777;
  margin-top: 2px;
`;

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
  surchargeCents: number;
  disabled?: boolean;
}

/** FR-001b: freiwillige Übernahme der Zahlungsgebühr – standardmäßig aus, Aufschlag sichtbar. */
export const CoverFeesToggle: React.FC<Props> = ({ value, onChange, surchargeCents, disabled }) => {
  const label = surchargeCents > 0 ? `Zahlungsgebühr übernehmen (+${formatEuro(surchargeCents)})` : "Zahlungsgebühr übernehmen";
  return (
    <Row>
      <Texts>
        <Label>{label}</Label>
        <Hint>Dann kommt Deine Spende vollständig bei DEMOCRACY an.</Hint>
      </Texts>
      <Switch
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        trackColor={{ true: "#4494d3", false: "#d6d6d6" }}
        accessibilityLabel={label}
        testID="donate-cover-fees"
      />
    </Row>
  );
};
