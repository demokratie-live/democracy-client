import { ApolloLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';

export const applicationIdLinkMiddleware = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'application-id': DeviceInfo.getBundleId(),
    },
  };
}) as unknown as ApolloLink;
