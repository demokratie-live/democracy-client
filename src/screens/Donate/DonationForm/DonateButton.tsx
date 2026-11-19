import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity<{ inactive: boolean }>`
  margin-top: 18px;
  min-height: 52px;
  padding-vertical: 12px;
  padding-horizontal: 12px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  background-color: ${({ inactive }) => (inactive ? "#9b9b9b" : "#4494d3")};
`;

const Label = styled.Text`
  color: #fff;
  font-size: 17px;
  font-weight: 600;
`;

interface Props {
  label: string;
  onPress: () => void;
  disabled: boolean;
  busy: boolean;
  testID?: string;
}

/** FR-011: Während eines laufenden Vorgangs deaktiviert – Mehrfachtippen löst keine zweite Zahlung aus. */
export const DonateButton: React.FC<Props> = ({ label, onPress, disabled, busy, testID = "donate-submit" }) => (
  <Container
    inactive={disabled || busy}
    disabled={disabled || busy}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled: disabled || busy, busy }}
    testID={testID}
  >
    {busy ? <ActivityIndicator color="#fff" /> : <Label>{label}</Label>}
  </Container>
);
