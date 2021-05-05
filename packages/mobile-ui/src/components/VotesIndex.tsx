import React from 'react';
import { styled } from '../styles';

interface Props {
  voted: boolean;
  votes: number;
}

const Number = styled.Text<Pick<Props, 'voted'>>`
  color: ${({ voted, theme }) =>
    voted ? '#4494d3' : theme.textColors.secondary};
  font-weight: bold;
`;

export const VotesIndex: React.FC<Props> = ({ votes, voted }) => (
  <Number voted={voted}>{votes}</Number>
);
