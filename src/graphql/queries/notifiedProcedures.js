import gql from "graphql-tag";

export default gql`
  query getNotifiedProcedures {
    notifiedProcedures {
      title
      procedureId
      notify
      currentStatus
      voteDate
      activityIndex {
        activityIndex
        active
      }
    }
  }
`;
