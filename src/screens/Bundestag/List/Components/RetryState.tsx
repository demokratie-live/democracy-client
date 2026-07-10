import React from "react";
import styled from "styled-components/native";

import { Centered } from "../../../../components/Centered";
import { ListLoading } from "../../../../components/ListLoading";

interface RetryStateProps {
  remainingAttempts: number;
  nextRetryInSeconds: number | null;
}

export const RetryState: React.FC<RetryStateProps> = ({
  remainingAttempts,
  nextRetryInSeconds,
}) => {
  const countdownSeconds =
    typeof nextRetryInSeconds === "number"
      ? Math.max(nextRetryInSeconds, 1)
      : null;
  const countdownCopy =
    countdownSeconds !== null
      ? `Nächster Versuch in ${countdownSeconds}s.`
      : "Nächster Versuch in Kürze.";

  return (
    <Centered>
      <ListLoading />
      <RetryMessage>Verbindung wird wiederhergestellt…</RetryMessage>
      <RetryHint>
        {countdownCopy} Verbleibende{" "}
        {remainingAttempts === 1 ? "Versuch" : "Versuche"}: {remainingAttempts}
      </RetryHint>
    </Centered>
  );
};

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
