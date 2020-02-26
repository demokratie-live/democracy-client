import gql from 'graphql-tag';

export default gql`
  {
    notificationSettings {
      enabled
      newVote
      newPreperation
      disableUntil
      procedures
      tags
    }
  }
`;
