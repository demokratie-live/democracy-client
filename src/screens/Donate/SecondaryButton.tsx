import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const Container = styled.TouchableOpacity<{ inactive: boolean }>`
  margin-top: 12px;
  height: 46px;
  border-radius: 6px;
  border-width: 1px;
  border-color: ${({ inactive }) => (inactive ? "#c8c8c8" : "#4494d3")};
  align-items: center;
  justify-content: center;
  background-color: #fff;
`;

const Label = styled.Text<{ inactive: boolean }>`
  color: ${({ inactive }) => (inactive ? "#9b9b9b" : "#4494d3")};
  font-size: 16px;
  font-weight: 600;
`;

interface Props {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  busy?: boolean;
  testID?: string;
}

/** Umrandeter Button für Nebenaktionen der Spenden-Screens (Verwalten, Zahlungsart ändern). */
export const SecondaryButton: React.FC<Props> = ({ label, onPress, disabled = false, busy = false, testID }) => (
  <Container
    inactive={disabled || busy}
    disabled={disabled || busy}
    onPress={onPress}
    accessibilityRole="button"
    accessibilityLabel={label}
    accessibilityState={{ disabled: disabled || busy, busy }}
    testID={testID}
  >
    {busy ? <ActivityIndicator color="#4494d3" /> : <Label inactive={disabled}>{label}</Label>}
  </Container>
);
