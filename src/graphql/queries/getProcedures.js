import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";
import Viewed from "../fragments/ProcedureViewed";

export default gql`
  query procedures($offset: Int, $pageSize: Int, $type: ProcedureType!) {
    procedures(offset: $offset, pageSize: $pageSize, type: $type) {
      _id
      title
      procedureId
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
