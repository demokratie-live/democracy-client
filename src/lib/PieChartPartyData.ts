import { Slice } from "../components/PieChart";
import { PartyVote, VoteResult } from "../__generated__/graphql";

interface Props {
  votedGovernment?: boolean | null;
  voteResults?: Pick<
    VoteResult,
    "yes" | "abstination" | "no" | "notVoted"
  > | null;
  partyVotes?: Pick<PartyVote, "deviants" | "party">[] | null;
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
      (voteResults.no || 0) +
      (voteResults.notVoted || 0);
    return partyVotes.reduce<Slice[]>((prev, party) => {
      if (party.party === selectedParty) {
        const { abstination, no, yes, notVoted } = party.deviants;
        return [
          {
            color: "#99C93E",
            percent: (yes || 0) / sumVotes,
            large: true,
          },
          {
            color: "#99C93E",
            percent: (voteResults.yes - yes || 0) / sumVotes,
          },
          {
            color: "#4CB0D8",
            percent: (abstination || 0) / sumVotes,
            large: true,
          },
          {
            color: "#4CB0D8",
            percent: (voteResults.abstination - abstination || 0) / sumVotes,
          },
          {
            color: "#D43194",
            percent: (no || 0) / sumVotes,
            large: true,
          },
          {
            color: "#D43194",
            percent: (voteResults.no - no || 0) / sumVotes,
          },
          {
            color: "#B1B3B4",
            percent: (notVoted || 0) / sumVotes,
            large: true,
          },
          {
            color: "#B1B3B4",
            percent: ((voteResults.notVoted ?? 0) - (notVoted ?? 0)) / sumVotes,
          },
        ];
      }
      return prev;
    }, []);
  }
  return;
};
