import React from "react";
import styled from "styled-components/native";

const Input = styled.TextInput`
  margin-top: 16px;
  border-width: 1px;
  border-color: #d6d6d6;
  border-radius: 8px;
  padding-horizontal: 14px;
  padding-vertical: 12px;
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
  const label = required ? "E-Mail für Bestätigung und Verwaltung" : "E-Mail für die Bestätigung (optional)";
  return (
    <Input
      value={value}
      onChangeText={onChange}
      editable={!disabled}
      placeholder={label}
      placeholderTextColor="#9b9b9b"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      autoComplete="email"
      textContentType="emailAddress"
      accessibilityLabel={label}
      testID="donate-email"
    />
  );
};
