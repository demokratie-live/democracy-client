import React from "react";
import styled from "styled-components/native";

import { Centered } from "../../../../components/Centered";
import { ListLoading } from "../../../../components/ListLoading";

interface RetryStateProps {
  remainingAttempts: number;
}

export const RetryState: React.FC<RetryStateProps> = ({
  remainingAttempts,
}) => (
  <Centered>
    <ListLoading />
    <RetryMessage>Verbindung wird wiederhergestellt…</RetryMessage>
    <RetryHint>
      Automatischer Versuch in Kürze. Verbleibende Versuche: {remainingAttempts}
    </RetryHint>
  </Centered>
);

const RetryMessage = styled.Text`
  margin-top: 16px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const RetryHint = styled.Text`
  margin-top: 4px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 12px;
`;
