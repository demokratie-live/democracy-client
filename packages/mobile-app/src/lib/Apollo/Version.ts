import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';

export const versionLinkMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      version: DeviceInfo.getVersion(),
    },
  };
});
