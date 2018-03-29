import gql from "graphql-tag";

export default gql`
  mutation updateNotificationSettings(
    $enabled: Boolean
    $disableUntil: Date
    $newVote: Boolean
    $newPreperation: Boolean
    $procedures: [String]
    $tags: [String]
  ) {
    updateNotificationSettings(
      enabled: $enabled
      disableUntil: $disableUntil
      newVote: $newVote
      newPreperation: $newPreperation
      procedures: $procedures
      tags: $tags
    ) {
      enabled
      disableUntil
      newVote
      newPreperation
      procedures
      tags
    }
  }
`;
