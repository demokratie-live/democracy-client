/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { FC } from 'react';
import { NativeModules, Platform } from 'react-native';
import { RestLink } from 'apollo-link-rest';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from 'apollo-link-retry';
import { authLinkMiddleware, authLinkAfterware } from './Auth';
import { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL, ANDROID_SERVER } from '../config';
import { RetryFunction } from 'apollo-link-retry/lib/retryFunction';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { versionLinkMiddleware } from './Version';
import { ApolloClient, InMemoryCache, ApolloLink, ApolloProvider, HttpLink } from '@apollo/client';
import { typePolicies } from './TypePolicies';
import { Deputy, Procedure } from '../../__generated__/graphql';
// import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  // dataIdFromObject: (o: Procedure | Deputy) => {
  //   switch (o.__typename) {
  //     case 'Procedure':
  //       return o.procedureId;
  //     case 'Deputy':
  //       return o.webId;
  //     default:
  //       return o._id || '';
  //   }
  // },
  // typePolicies,
});

const graphQlUri = GRAPHQL_URL;
// if (process.env.NODE_ENV === 'development' && GRAPHQL_SERVER_LOCAL) {
//   // extract democracy api hostname from package bundler url
//   const scriptURL = NativeModules.SourceCode.scriptURL;
//   const address = scriptURL.split('://')[1].split('/')[0];
//   const hostname = address.split(':')[0];
//   graphQlUri = `http://${hostname}:3000`;
//   console.log('graphQlUri', graphQlUri);
//   if (Platform.OS === 'android' && !DeviceInfo.isEmulatorSync()) {
//     graphQlUri = `http://${ANDROID_SERVER}:3000`;
//   }
// }

const httpLink = new HttpLink({
  uri: graphQlUri,
});

// Retry link
const attempts: RetryFunction = (number, operation) => {
  if (number < 3) {
    return true;
  }
  if (operation.operationName === 'NotificationSettings' && number === 1) {
    return true;
  }
  switch (operation.operationName) {
    case 'Me':
      return true;
    default:
      return false;
  }
};

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
          null,
          4,
        )}, Path: ${JSON.stringify(path)}`,
      );

      if (message === 'Permission Denied') {
        AsyncStorage.removeItem('auth_token').catch(console.error);
        AsyncStorage.removeItem('auth_refreshToken').catch(console.error);
      }
    });
  }
  if (networkError) {
    const { message, name } = networkError;
    console.log(`[Network error]: ${JSON.stringify(networkError)}`, message, name);
  }
});

const restLink = new RestLink({
  uri: 'https://democracy-deutschland.de/api.php', // ?call=donation_status
});

const link = ApolloLink.from([
  errorLink,
  versionLinkMiddleware,
  authLinkMiddleware,
  authLinkAfterware,
  restLink,
  httpLink,
]);

export const client = new ApolloClient({
  cache,
  link,
});
