import gql from "graphql-tag";

export default gql`
  mutation updateNetworkStatus($isConnected: Boolean, $requestError: String) {
    updateNetworkStatus(isConnected: $isConnected, requestError: $requestError)
      @client
  }
`;
