import { ProceduresList_procedures_voteResults } from '../../screens/Bundestag/List/graphql/query/__generated__/ProceduresList';
import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';
import { proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures_voteResults } from '../../screens/Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';

interface Props<T = ProceduresList_procedures_voteResults> {
  votedGovernment?: boolean | null;
  voteResults?: T | null;
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

export const pieChartGovernmentDataLargeParty = ({
  votedGovernment,
  voteResults,
  party,
}: {
  votedGovernment?: boolean | null;
  voteResults?: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures_voteResults | null;
  party: string;
}): Slice[] | undefined => {
  if (votedGovernment && voteResults) {
    // TODO improve graphql types for this
    const sumVotes =
      (voteResults.yes || 0) +
      (voteResults.abstination || 0) +
      (voteResults.no || 0);
    const curParty = voteResults.partyVotes.find(({ party: p }) => party === p);
    if (!curParty) {
      return [];
    }
    return [
      {
        color: '#99C93E',
        percent: (curParty.deviants.yes || 0) / sumVotes,
        large: true,
      },
      {
        color: '#99C93E',
        percent:
          ((voteResults.yes || 0) - (curParty.deviants.yes || 0)) / sumVotes,
      },
      {
        color: '#4CB0D8',
        percent: (curParty.deviants.abstination || 0) / sumVotes,
        large: true,
      },
      {
        color: '#4CB0D8',
        percent:
          ((voteResults.abstination || 0) -
            (curParty.deviants.abstination || 0)) /
          sumVotes,
      },
      {
        color: '#D43194',
        percent: (curParty.deviants.no || 0) / sumVotes,
        large: true,
      },
      {
        color: '#D43194',
        percent:
          ((voteResults.no || 0) - (curParty.deviants.no || 0)) / sumVotes,
      },
    ];
  }
  return;
};
