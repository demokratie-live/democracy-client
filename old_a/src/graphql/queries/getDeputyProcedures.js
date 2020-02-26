import gql from 'graphql-tag';

// Fragments
import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Voted from '../fragments/ProcedureVoted';
import Viewed from '../fragments/ProcedureViewed';

export default gql`
  query deputyProcedures(
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
          ...ActivityIndex
          ...Voted
          ...Viewed
          _id
          procedureId
          title
          subjectGroups
          voteDate
          votedGovernment
          submissionDate
          completed
          voteResults {
            governmentDecision
            partyVotes {
              party
              main
            }
          }
        }
      }
    }
  }
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
`;
