import { VoteSelection } from '../../../../../__generated__/globalTypes';
import { ChainEntry } from '../../../../lib/VotesLocal';
import { ChartData } from '../../../WahlOMeter/Wahlkreis/VotedProceduresWrapper';

// Filtered Array of procedures voted local
export const getMatchingProcedures = ({
  votedProcedures,
  localVotes,
}: ChartData) =>
  votedProcedures.filter(({ procedureId }) =>
    localVotes.find(({ procedureId: pid }) => pid === procedureId),
  );

export const pieChartData = ({
  localVotes,
  matchingProcedures,
}: {
  localVotes: ChainEntry[];
  matchingProcedures: {
    procedureId: string;
    decision: VoteSelection;
  }[];
}) => {
  // Pie Chart Data Preparation
  const pieDataRaw = matchingProcedures.map(({ decision, procedureId }) => {
    const userVote = localVotes.find(
      ({ procedureId: pid }) => pid === procedureId,
    );
    return {
      deputy: decision,
      me: userVote ? userVote.selection : undefined,
    };
  });
  const pieData = pieDataRaw.reduce(
    (pre, { deputy, me }) => {
      if (me === deputy) {
        return { ...pre, matches: pre.matches + 1, count: pre.count + 1 };
      } else {
        return { ...pre, diffs: pre.diffs + 1, count: pre.count + 1 };
      }
    },
    { matches: 0, diffs: 0, count: 0 },
  );
  return [
    {
      label: 'Übereinstimmungen',
      percent: pieData.matches / pieData.count,
      value: pieData.matches,
      total: pieData.count,
      color: '#f5a623',
    },
    {
      label: 'Differenzen',
      percent: pieData.diffs / pieData.count,
      value: pieData.diffs,
      total: pieData.count,
      color: '#b1b3b4',
    },
  ];
};
