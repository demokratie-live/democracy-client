import gql from 'graphql-tag';

export const VOTED_PARTY_PROCEDURES = gql`
  query VotedPartyProcedures(
    $procedureIds: [String!]
    $pageSize: Int
    $offset: Int
  ) {
    proceduresByIdHavingVoteResults(
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
            deviants {
              yes
              no
              abstination
              notVoted
            }
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
`;
