import React from "react";
import styled from "styled-components/native";

const Label = styled.Text`
  font-size: 15px;
  color: #333;
  margin-top: 14px;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  border-width: 1px;
  border-color: #d6d6d6;
  border-radius: 6px;
  padding-horizontal: 12px;
  padding-vertical: 10px;
  font-size: 16px;
  color: #333;
`;

interface Props {
  value: string;
  onChange: (value: string) => void;
  required: boolean;
  disabled?: boolean;
}

/** FR-007: Pflicht bei monatlichen Spenden (Belege, Verwaltungslink), sonst optional. */
export const EmailField: React.FC<Props> = ({ value, onChange, required, disabled }) => {
  const label = required ? "E-Mail für Bestätigungen und Verwaltung" : "E-Mail für die Spendenbestätigung (optional)";
  return (
    <>
      <Label>{label}</Label>
      <Input
        value={value}
        onChangeText={onChange}
        editable={!disabled}
        placeholder="name@beispiel.de"
        placeholderTextColor="#9b9b9b"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="email"
        textContentType="emailAddress"
        accessibilityLabel={label}
        testID="donate-email"
      />
    </>
  );
};
