import gql from 'graphql-tag';

// Procedure.VoteResult.PartyVote.fragments = {
export const procedureVoteResultPartyVoteDeviants = gql`
  fragment DeviantsPartyVote on PartyVote {
    deviants {
      yes
      no
      abstination
      notVoted
    }
  }
`;
