import gql from "graphql-tag";

export default gql`
  query votedLocal($procedureId: String) {
    votedLocal(procedureId: $procedureId) @client {
      selection
    }
  }
`;
