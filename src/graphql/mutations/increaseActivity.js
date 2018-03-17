import gql from "graphql-tag";

export default gql`
  mutation increaseActivity($procedureId: Int!) {
    increaseActivity(procedureId: $procedureId) {
      activityIndex
    }
  }
`;
