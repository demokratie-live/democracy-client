import {
  proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures,
  proceduresByIdHavingVoteResults,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import { ChainEntry } from '../../../lib/VotesLocal';
import { ChartData } from '../Bundestag/VotedProceduresWrapper';

export const partyChartData = ({
  localVotes,
  matchingProcedures,
}: {
  matchingProcedures: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures[];
  votedProcedures: proceduresByIdHavingVoteResults;
  localVotes: ChainEntry[];
}) => {
  const chartData = matchingProcedures.reduce<{
    [party: string]: { diffs: number; matches: number };
  }>((prev, { voteResults, procedureId }) => {
    if (!voteResults) {
      return prev;
    }
    const { partyVotes } = voteResults;
    const userVote = localVotes.find(
      ({ procedureId: pid }) => pid === procedureId,
    );
    const me = userVote ? userVote.selection : undefined;
    partyVotes.forEach(({ party, main }) => {
      if (party === 'fraktionslos') {
        return prev;
      }
      let matched = false;
      if (me === main) {
        matched = true;
      }

      if (prev[party] && matched) {
        prev = {
          ...prev,
          [party]: {
            ...prev[party],
            matches: prev[party].matches + 1,
          },
        };
      } else if (prev[party] && !matched) {
        prev = {
          ...prev,
          [party]: {
            ...prev[party],
            diffs: prev[party].diffs + 1,
          },
        };
      } else if (!prev[party] && matched) {
        prev = {
          ...prev,
          [party]: {
            diffs: 0,
            matches: 1,
          },
        };
      } else if (!prev[party] && !matched) {
        prev = {
          ...prev,
          [party]: {
            matches: 0,
            diffs: 1,
          },
        };
      }
    });
    return prev;
  }, {});
  return Object.keys(chartData)
    .map(key => ({
      party: key,
      values: [
        {
          label: 'Übereinstimmungen',
          value: chartData[key].matches,
          color: '#f5a623',
        },
        {
          label: 'Differenzen',
          value: chartData[key].diffs,
          color: '#b1b3b4',
        },
      ],
    }))
    .sort((a, b) => b.values[0].value - a.values[0].value);
};

export const getMatchingProcedures = ({
  votedProcedures,
  localVotes,
}: ChartData) =>
  votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(
    ({ procedureId }) =>
      localVotes.find(({ procedureId: pid }) => pid === procedureId),
  );
