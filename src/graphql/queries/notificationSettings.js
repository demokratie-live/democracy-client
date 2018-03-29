import gql from "graphql-tag";

export default gql`
  {
    notificationSettings {
      disableAll
      disableUntil
      procedures
      tags
    }
  }
`;
