import React, { useState } from "react";
import styled from "styled-components/native";
import { formatEuroShort, parseEuroInput } from "../../../lib/formatEuro";

const Presets = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-horizontal: -4px;
`;

const Preset = styled.TouchableOpacity<{ selected: boolean }>`
  min-width: 70px;
  margin: 4px;
  padding-vertical: 10px;
  padding-horizontal: 14px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ selected }) => (selected ? "#4494d3" : "#d6d6d6")};
  background-color: ${({ selected }) => (selected ? "#eaf3fb" : "#fff")};
  align-items: center;
`;

const PresetText = styled.Text<{ selected: boolean }>`
  font-size: 16px;
  font-weight: ${({ selected }) => (selected ? "700" : "400")};
  color: #333;
`;

const CustomRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
  border-width: 1px;
  border-color: #d6d6d6;
  border-radius: 6px;
  padding-horizontal: 12px;
`;

const CustomInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  padding-vertical: 10px;
  color: #333;
`;

const Suffix = styled.Text`
  font-size: 16px;
  color: #777;
`;

interface Props {
  presets: number[];
  valueCents: number | null;
  onChange: (cents: number | null) => void;
  disabled?: boolean;
}

export const AmountPicker: React.FC<Props> = ({ presets, valueCents, onChange, disabled }) => {
  const [customText, setCustomText] = useState("");

  const choosePreset = (cents: number) => {
    setCustomText("");
    onChange(cents);
  };

  const changeCustom = (text: string) => {
    setCustomText(text);
    onChange(parseEuroInput(text));
  };

  return (
    <>
      <Presets accessibilityRole="radiogroup" accessibilityLabel="Betrag auswählen">
        {presets.map((cents) => {
          const selected = customText === "" && valueCents === cents;
          return (
            <Preset
              key={cents}
              selected={selected}
              disabled={disabled}
              onPress={() => choosePreset(cents)}
              accessibilityRole="radio"
              accessibilityState={{ selected, disabled }}
              accessibilityLabel={formatEuroShort(cents)}
              testID={`donate-amount-${cents}`}
            >
              <PresetText selected={selected}>{formatEuroShort(cents)}</PresetText>
            </Preset>
          );
        })}
      </Presets>
      <CustomRow>
        <CustomInput
          value={customText}
          onChangeText={changeCustom}
          editable={!disabled}
          placeholder="Anderer Betrag"
          placeholderTextColor="#9b9b9b"
          keyboardType="decimal-pad"
          returnKeyType="done"
          accessibilityLabel="Anderer Betrag in Euro"
          testID="donate-amount-custom"
        />
        <Suffix>€</Suffix>
      </CustomRow>
    </>
  );
};
