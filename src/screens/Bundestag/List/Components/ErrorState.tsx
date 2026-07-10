import React from "react";
import styled from "styled-components/native";

import { Button } from "../../../../components/Button";
import { Centered } from "../../../../components/Centered";

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => (
  <Centered>
    <Title>Server nicht erreichbar</Title>
    <Description>
      Wir konnten keine Verbindung zu DEMOCRACY herstellen. Prüfe deine
      Internetverbindung oder versuche es in ein paar Sekunden erneut.
    </Description>
    <Button
      onPress={onRetry}
      text="Nochmal versuchen"
      textColor="blue"
      backgroundColor="transparent"
    />
  </Centered>
);

const Title = styled.Text`
  margin-bottom: 8px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: 600;
`;

const Description = styled.Text`
  margin-bottom: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
`;
