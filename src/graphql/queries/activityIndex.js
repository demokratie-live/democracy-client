import gql from "graphql-tag";

export default gql`
  query activityIndex($procedureId: String!) {
    activityIndex(procedureId: $procedureId) {
      activityIndex
    }
  }
`;
