import { Slice } from '@democracy-deutschland/mobile-ui/src/components/shared/Charts/PieChart';
import { VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes } from '../../screens/WahlOMeter/Fraktionen/graphql/queries/__generated__/VotedPartyProcedures';
import { ProceduresList_procedures_voteResults } from '../../screens/Bundestag/List/graphql/query/__generated__/ProceduresList';

interface Props {
  votedGovernment?: boolean | null;
  voteResults?: ProceduresList_procedures_voteResults | null;
  partyVotes?:
    | VotedPartyProcedures_votedPartyProcedures_procedures_voteResults_partyVotes[]
    | null;
  selectedParty: string;
}

export const pieChartPartyData = ({
  votedGovernment,
  partyVotes,
  selectedParty,
  voteResults,
}: Props): Slice[] | undefined => {
  if (votedGovernment && voteResults && partyVotes) {
    const sumVotes =
      (voteResults.yes || 0) +
      (voteResults.abstination || 0) +
      (voteResults.no || 0);
    return partyVotes.reduce<Slice[]>((prev, party) => {
      if (party.party === selectedParty) {
        const { abstination, no, yes } = party.deviants;
        return [
          {
            color: '#99C93E',
            percent: (yes || 0) / sumVotes,
            large: true,
          },
          {
            color: '#99C93E',
            percent: (voteResults.yes - yes || 0) / sumVotes,
          },
          {
            color: '#4CB0D8',
            percent: (abstination || 0) / sumVotes,
            large: true,
          },
          {
            color: '#4CB0D8',
            percent: (voteResults.abstination - abstination || 0) / sumVotes,
          },
          {
            color: '#D43194',
            percent: (no || 0) / sumVotes,
            large: true,
          },
          {
            color: '#D43194',
            percent: (voteResults.no - no || 0) / sumVotes,
          },
        ];
      }
      return prev;
    }, []);
  }
  return;
};
