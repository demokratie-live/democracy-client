import { Slice } from '../components/PieChart';
import { VoteResult } from '../__generated__/graphql';

interface Props {
  votedGovernment?: boolean | null;
  voteResults?: Pick<VoteResult, 'yes' | 'abstination' | 'no'> | null;
  largeDecision?: 'YES' | 'ABSTINATION' | 'NOTVOTED' | 'NO' | null;
}

export const pieChartGovernmentData = ({
  votedGovernment,
  voteResults,
  largeDecision,
}: Props): Slice[] | undefined => {
  if (votedGovernment && voteResults) {
    const sumVotes =
      (voteResults.yes || 0) + (voteResults.abstination || 0) + (voteResults.no || 0);
    return [
      {
        color: '#99C93E',
        percent: (voteResults.yes || 0) / sumVotes,
        large: largeDecision === 'YES',
      },
      {
        color: '#4CB0D8',
        percent: (voteResults.abstination || 0) / sumVotes,
        large: largeDecision === 'ABSTINATION',
      },
      {
        color: '#D43194',
        percent: (voteResults.no || 0) / sumVotes,
        large: largeDecision === 'NO',
      },
    ];
  }
  return;
};
