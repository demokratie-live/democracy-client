import gql from 'graphql-tag';

export const PROCEDURES_BY_HAVING_VOTE_RESULTS = gql`
  query proceduresByIdHavingVoteResults(
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
    }
  }
`;
