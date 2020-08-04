import { gql } from '@apollo/client';

// Procedure.VoteResult.PartyVote.fragments = {
export const ListItemData = gql`
  fragment ListItemData on Procedure {
    _id
    procedureId
    sessionTOPHeading
    title
    tags
    voteDate
    votedGovernment
    submissionDate
    completed
    subjectGroups
    votedGovernment
    voted
    type
    voteResults {
      governmentDecision
      yes
      abstination
      no
      notVoted
      partyVotes {
        party
        main
      }
    }
    communityVotes {
      yes
      abstination
      no
      total
    }
  }
`;
