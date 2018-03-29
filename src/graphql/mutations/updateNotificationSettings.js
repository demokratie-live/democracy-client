import gql from "graphql-tag";

export default gql`
  mutation updateNotificationSettings(
    $disableAll: String
    $disableUntil: Date
    $procedures: [String]
    $tags: [String]
  ) {
    updateNotificationSettings(
      disableAll: $disableAll
      disableUntil: $disableUntil
      procedures: $procedures
      tags: $tags
    ) {
      disableAll
      disableUntil
      procedures
      tags
    }
  }
`;
