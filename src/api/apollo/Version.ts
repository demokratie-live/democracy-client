/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ApolloLink } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import DeviceInfo from 'react-native-device-info';

export const versionLinkMiddleware = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      version: DeviceInfo.getVersion(),
    },
  };
}) as unknown as ApolloLink;
