import gql from "graphql-tag";

export default gql`
  mutation requestVerification($code: String!, $newPhoneHash: String!, $newUser: Boolean){
    requestVerification(code: $code, newPhoneHash: $newPhoneHash, newUser: $newUser){
      reason
      succeeded
    }
  }
`;
