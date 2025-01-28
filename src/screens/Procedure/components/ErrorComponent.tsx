import React, { FC } from "react";
import { Text } from "react-native";
import { Centered } from "../../../components/Centered";
import { Button } from "../../../components/Button";

type ErrorComponentProps = {
  onRetry: () => void;
};

export const ErrorComponent: FC<ErrorComponentProps> = ({ onRetry }) => (
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
