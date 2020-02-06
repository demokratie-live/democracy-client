import React from 'react';
import styled from 'styled-components/native';

interface Props {
  voted: boolean;
  votes: number;
}

const Number = styled.Text<Pick<Props, 'voted'>>`
  color: ${({ voted }) => (voted ? '#4494d3' : '#8f8e94')};
  font-weight: bold;
`;

export const VotesIndex: React.FC<Props> = ({ votes, voted }) => (
  <Number voted={voted}>{votes}</Number>
);
