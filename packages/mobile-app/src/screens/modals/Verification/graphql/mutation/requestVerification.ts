import gql from 'graphql-tag';

export default gql`
  mutation RequestVerification(
    $code: String!
    $newPhoneHash: String!
    $newUser: Boolean
  ) {
    requestVerification(
      code: $code
      newPhoneHash: $newPhoneHash
      newUser: $newUser
    ) {
      reason
      succeeded
    }
  }
`;
