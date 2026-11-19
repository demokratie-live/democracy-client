import React from "react";
import styled from "styled-components/native";
import type { DonationInterval } from "../../../api/donations/types";

const Row = styled.View`
  flex-direction: row;
  border-radius: 6px;
  border-width: 1px;
  border-color: #4494d3;
  overflow: hidden;
`;

const Option = styled.TouchableOpacity<{ selected: boolean }>`
  flex: 1;
  padding-vertical: 10px;
  align-items: center;
  background-color: ${({ selected }) => (selected ? "#4494d3" : "#fff")};
`;

const OptionText = styled.Text<{ selected: boolean }>`
  font-size: 15px;
  font-weight: 600;
  color: ${({ selected }) => (selected ? "#fff" : "#4494d3")};
`;

const OPTIONS: { value: DonationInterval; label: string }[] = [
  { value: "monthly", label: "Monatlich" },
  { value: "one_time", label: "Einmalig" },
];

interface Props {
  value: DonationInterval;
  onChange: (value: DonationInterval) => void;
  disabled?: boolean;
}

export const IntervalToggle: React.FC<Props> = ({ value, onChange, disabled }) => (
  <Row accessibilityRole="radiogroup" accessibilityLabel="Spendenrhythmus">
    {OPTIONS.map((option) => {
      const selected = option.value === value;
      return (
        <Option
          key={option.value}
          selected={selected}
          disabled={disabled}
          onPress={() => onChange(option.value)}
          accessibilityRole="radio"
          accessibilityState={{ selected, disabled }}
          accessibilityLabel={`${option.label} spenden`}
          testID={`donate-interval-${option.value}`}
        >
          <OptionText selected={selected}>{option.label}</OptionText>
        </Option>
      );
    })}
  </Row>
);
