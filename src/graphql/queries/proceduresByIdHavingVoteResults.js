import gql from 'graphql-tag';

// Fragments
import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Voted from '../fragments/ProcedureVoted';
import Viewed from '../fragments/ProcedureViewed';

export default gql`
  query proceduresByIdHavingVoteResults($procedureIds: [String!], $pageSize: Int, $offset: Int) {
    proceduresByIdHavingVoteResults(
      procedureIds: $procedureIds
      pageSize: $pageSize
      offset: $offset
    ) {
      total
      procedures {
        ...ActivityIndex
        ...Voted
        ...Viewed
        _id
        procedureId
        title
        tags
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
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
`;
