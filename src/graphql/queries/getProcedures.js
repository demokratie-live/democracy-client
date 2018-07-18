import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";
import Viewed from "../fragments/ProcedureViewed";

export default gql`
  query procedures(
    $offset: Int
    $pageSize: Int
    $type: ProcedureType!
    $sort: String
  ) {
    procedures(offset: $offset, pageSize: $pageSize, type: $type, sort: $sort) {
      _id
      title
      procedureId
      currentStatus
      type
      subjectGroups
      tags
      abstract
      voteDate
      votedGovernment
      submissionDate
      completed
      ...ActivityIndex
      ...Voted
      ...Viewed
    }
  }
  ${ActivityIndex}
  ${Voted}
  ${Viewed}
`;
