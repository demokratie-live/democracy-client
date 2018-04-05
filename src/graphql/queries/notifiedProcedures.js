import gql from "graphql-tag";

export default gql`
  {
    notifiedProcedures {
      title
      procedureId
      notify
      currentStatus
      voteDate
    }
  }
`;
