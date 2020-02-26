import DeviceInfo from 'react-native-device-info';

export const getShareLink = () => {
  switch (DeviceInfo.getBundleId()) {
    case 'de.democracy-deutschland.clientapp.internal':
    case 'de.democracydeutschland.app.internal':
      return 'https://internal.democracy-app.de';

    case 'de.democracy-deutschland.clientapp.alpha':
    case 'de.democracydeutschland.app.alpha':
      return 'https://alpha.democracy-app.de';

    case 'de.democracy-deutschland.clientapp.beta':
    case 'de.democracydeutschland.app.beta':
      return 'https://beta.democracy-app.de';

    default:
      return 'https://democracy-app.de';
  }
};
