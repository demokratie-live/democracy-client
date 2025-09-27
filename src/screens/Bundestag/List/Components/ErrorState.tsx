import React from "react";
import { Text } from "react-native";

import { Button } from "../../../../components/Button";
import { Centered } from "../../../../components/Centered";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => (
  <Centered>
    <Text>Verbindungsfehler</Text>
    <Button
      onPress={onRetry}
      text="Nochmal versuchen"
      textColor="blue"
      backgroundColor="transparent"
    />
  </Centered>
);
