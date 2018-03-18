import gql from "graphql-tag";

export default gql`
  mutation increaseActivity($procedureId: String!) {
    increaseActivity(procedureId: $procedureId) {
      activityIndex
    }
  }
`;
