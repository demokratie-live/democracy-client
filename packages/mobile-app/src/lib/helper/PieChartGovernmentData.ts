import { ProceduresList_procedures_voteResults } from '../../screens/Bundestag/List/graphql/query/__generated__/ProceduresList';
import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';

interface Props {
  votedGovernment?: boolean | null;
  voteResults?: ProceduresList_procedures_voteResults | null;
}

export const pieChartGovernmentData = ({
  votedGovernment,
  voteResults,
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
      },
      {
        color: '#4CB0D8',
        percent: (voteResults.abstination || 0) / sumVotes,
      },
      {
        color: '#D43194',
        percent: (voteResults.no || 0) / sumVotes,
      },
    ];
  }
  return;
};
