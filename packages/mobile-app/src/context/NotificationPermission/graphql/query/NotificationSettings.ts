import gql from 'graphql-tag';

export const NOTIFICATION_SETTINGS = gql`
  query NotificationSettings {
    notificationSettings {
      enabled
      conferenceWeekPushs
      voteConferenceWeekPushs
      voteTOP100Pushs
      outcomePushs
    }
  }
`;
