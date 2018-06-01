import gql from "graphql-tag";

import ActivityIndex from "../fragments/ProcedureActivityIndex";

export default gql`
  query getNotifiedProcedures {
    notifiedProcedures {
      title
      procedureId
      notify
      currentStatus
      voteDate
      ...ActivityIndex
    }
  }
  ${ActivityIndex}
`;
