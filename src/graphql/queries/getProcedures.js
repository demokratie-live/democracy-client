import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";

export default gql`
  query procedures($offset: Int, $pageSize: Int, $type: ProcedureType!) {
    procedures(offset: $offset, pageSize: $pageSize, type: $type) {
      _id
      title
      procedureId
      tags
      abstract
      voteDate
      submissionDate
      ...ActivityIndex
    }
  }
  ${ActivityIndex}
`;
