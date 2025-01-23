import { ApolloLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';

export const versionLinkMiddleware = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      version: DeviceInfo.getVersion(),
    },
  };
}) as unknown as ApolloLink;
