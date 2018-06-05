import gql from "graphql-tag";

export default gql`
  query votedLocal($procedure: ID!) {
    votedLocal(procedure: $procedure) @client {
      selection
    }
  }
`;
