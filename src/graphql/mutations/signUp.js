import gql from "graphql-tag";

export default gql`
  mutation signUp($deviceHashEncrypted: String!) {
    signUp(deviceHashEncrypted: $deviceHashEncrypted) {
      token
    }
  }
`;
