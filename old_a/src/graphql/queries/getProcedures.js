import gql from 'graphql-tag';

import ActivityIndex from '../fragments/ProcedureActivityIndex';
import Voted from '../fragments/ProcedureVoted';
import Viewed from '../fragments/ProcedureViewed';

export default gql`
  query procedures(
    $offset: Int
    $pageSize: Int
    $listTypes: [ListType!]
    $sort: String
    $filter: ProcedureFilter
  ) {
    procedures(
      offset: $offset
      pageSize: $pageSize
      listTypes: $listTypes
      sort: $sort
      filter: $filter
    ) {
      _id
      title
      procedureId
      subjectGroups
      voteDate
      list
      votedGovernment
      ...ActivityIndex
      ...Voted
      ...Viewed
    }
  }
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
`;
