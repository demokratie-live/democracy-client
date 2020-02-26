import Config from 'react-native-config';

import socialMediaConfigs from './socialMedia';
import betaEndConfigs from './betaEnd';

const requiredConfigs = {
  // No default Values
  GRAPHQL_URL: process.env.GRAPHQL_URL || Config.GRAPHQL_URL,
};

const recommendedConfigs = {
  // No correct default Values
  PHONE_NUMBER: process.env.PHONE_NUMBER || Config.PHONE_NUMBER || '',
  CONTACT_EMAIL: process.env.CONTACT_EMAIL || Config.CONTACT_EMAIL || '',
  URL_DONATE:
    process.env.URL_DONATE || Config.URL_DONATE || 'https://www.democracy-deutschland.de/#!donate',
  /* Unused
  NOTIFICATION_ANDROID_SENDER_ID:
    process.env.NOTIFICATION_ANDROID_SENDER_ID || Config.NOTIFICATION_ANDROID_SENDER_ID || '',
  */
};

const optionalConfigs = {
  // Default Values given
  ...socialMediaConfigs,
  ...betaEndConfigs,
};

export default {
  ...requiredConfigs,
  ...recommendedConfigs,
  ...optionalConfigs,
};
