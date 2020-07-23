import gql from 'graphql-tag';
import { procedureVoteResultPartyVoteDeviants } from '../fragments/deviants';

export const VOTED_PARTY_PROCEDURES = gql`
  query VotedPartyProcedures(
    $procedureIds: [String!]
    $pageSize: Int
    $offset: Int
  ) {
    votedPartyProcedures: proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
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
            ...DeviantsPartyVote
          }
        }
        communityVotes {
          yes
          abstination
          no
          total
        }
      }
    }
  }
  ${procedureVoteResultPartyVoteDeviants}
`;
