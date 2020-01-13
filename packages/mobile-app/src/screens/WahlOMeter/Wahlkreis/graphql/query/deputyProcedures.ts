import gql from 'graphql-tag';

export const DEPUTY_PROCEDURES = gql`
  query DeputyProcedures(
    $constituency: String!
    $directCandidate: Boolean
    $offset: Int
    $pageSize: Int
  ) {
    deputyProcedures: deputiesOfConstituency(
      constituency: $constituency
      directCandidate: $directCandidate
    ) {
      totalProcedures
      procedures(offset: $offset, pageSize: $pageSize) {
        decision
        procedure {
          _id
          procedureId
          title
          subjectGroups
          voteDate
          votedGovernment
          submissionDate
          completed
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
  }
`;
