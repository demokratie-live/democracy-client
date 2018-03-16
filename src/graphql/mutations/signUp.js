import gql from "graphql-tag";

export default gql`
  mutation signUp($deviceHash: String!) {
    signUp(deviceHash: $deviceHash) {
      token
    }
  }
`;
