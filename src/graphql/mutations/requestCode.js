import gql from "graphql-tag";

export default gql`
  mutation requestCode($newPhone: String!, $oldPhoneHash: String) {
    requestCode(newPhone: $newPhone, oldPhoneHash: $oldPhoneHash) {
      reason
      allowNewUser
      succeeded
      resendTime
      expireTime
    }
  }
`;
