import Config from 'react-native-config';

export default {
  BETA_END: process.env.BETA_END === 'true' || Config.BETA_END === 'true' || false,
  BETA_END_PLAYSTORE_URL:
    process.env.BETA_END_PLAYSTORE_URL ||
    Config.BETA_END_PLAYSTORE_URL ||
    'https://www.democracy-deutschland.de/',
  BETA_END_APPSTORE_URL:
    process.env.BETA_END_APPSTORE_URL ||
    Config.BETA_END_APPSTORE_URL ||
    'https://www.democracy-deutschland.de/',
};
