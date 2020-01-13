import { ProceduresList_procedures_voteResults } from '../../screens/Bundestag/List/graphql/query/__generated__/ProceduresList';
import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';

interface Props {
  votedGovernment?: boolean | null;
  voteResults?: ProceduresList_procedures_voteResults | null;
  largeDecision?: 'YES' | 'ABSTINATION' | 'NOTVOTED' | 'NO' | null;
}

export const pieChartGovernmentData = ({
  votedGovernment,
  voteResults,
  largeDecision,
}: Props): Slice[] | undefined => {
  if (votedGovernment && voteResults) {
    // TODO improve graphql types for this
    const sumVotes =
      (voteResults.yes || 0) +
      (voteResults.abstination || 0) +
      (voteResults.no || 0);
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
