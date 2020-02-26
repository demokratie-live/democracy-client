import gql from 'graphql-tag';

import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Voted from '../fragments/ProcedureVoted';

export default gql`
  query proceduresById($offset: Int, $pageSize: Int, $ids: [String]!) {
    procedures(offset: $offset, pageSize: $pageSize, ids: $ids) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
      votedGovernment
      submissionDate
      completed
      ...ActivityIndex
      ...Voted
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
