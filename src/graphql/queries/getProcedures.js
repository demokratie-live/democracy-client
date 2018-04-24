import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";
import Voted from "../fragments/ProcedureVoted";

export default gql`
  query procedures($offset: Int, $pageSize: Int, $type: ProcedureType!) {
    procedures(offset: $offset, pageSize: $pageSize, type: $type) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
      votedGoverment
      submissionDate
      ...ActivityIndex
      ...Voted
    }
  }
  ${ActivityIndex}
  ${Voted}
`;
