import gql from "graphql-tag";

export default gql`
  {
    networkStatus @client {
      isConnected
      requestError
    }
  }
`;
