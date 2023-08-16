export const getEnvironment = () => {
  switch (DeviceInfo.getBundleId()) {
    case 'de.democracy-deutschland.clientapp.internal':
    case 'de.democracydeutschland.app.internal':
      return 'internal';

    default:
      return 'production';
  }
};
