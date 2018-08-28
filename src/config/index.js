import Config from 'react-native-config';

export default {
  GRAPHQL_URL: process.env.GRAPHQL_URL || Config.GRAPHQL_URL,
  PHONE_NUMBER: process.env.PHONE_NUMBER || Config.PHONE_NUMBER || '',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || Config.CONTACT_EMAIL || '',
  GITHUB_URL: process.env.GITHUB_URL || Config.GITHUB_URL || '',
  NOTIFICATION_ANDROID_SENDER_ID:
    process.env.NOTIFICATION_ANDROID_SENDER_ID || Config.NOTIFICATION_ANDROID_SENDER_ID || '',
};
