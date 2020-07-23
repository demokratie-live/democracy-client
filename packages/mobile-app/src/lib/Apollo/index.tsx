import React, { FC } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { NativeModules, Platform } from 'react-native';
import { RestLink } from 'apollo-link-rest';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { authLinkMiddleware, authLinkAfterware } from './Auth';
import { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL, ANDROID_SERVER } from '../config';
import { RetryFunction } from 'apollo-link-retry/lib/retryFunction';
import AsyncStorage from '@react-native-community/async-storage';
import DeviceInfo from 'react-native-device-info';
import { versionLinkMiddleware } from './Version';
import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
// import { relayStylePagination } from '@apollo/client/utilities';

const cache = new InMemoryCache({
  // dataIdFromObject: (o: any) => {
  //   switch (o.__typename) {
  //     case 'Procedure':
  //       return o.procedureId;
  //     default:
  //       return o._id;
  //   }
  // },
  // typePolicies: {
  //   Query: {
  //     fields: {
  //       // Reusable helper function to generate a field
  //       // policy for the Query.search field, keyed by
  //       // search query:
  //       proceduresByIdHavingVoteResults: relayStylePagination(['query']),
  //     },
  //   },
  // },
});

let graphQlUri = GRAPHQL_URL;
if (process.env.NODE_ENV === 'development' && GRAPHQL_SERVER_LOCAL) {
  // extract democracy api hostname from package bundler url
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  graphQlUri = `http://${hostname}:3000`;
  if (Platform.OS === 'android' && !DeviceInfo.isEmulatorSync()) {
    graphQlUri = `http://${ANDROID_SERVER}:3000`;
  }
}

const httpLink: any = new HttpLink({
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

const retryLink: any = new RetryLink({
  delay: {
    initial: 3000,
    max: 10000,
    jitter: true,
  },
  attempts,
});

const errorLink: any = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
          null,
          4,
        )}, Path: ${path}`,
      );

      if (message === 'Permission Denied') {
        AsyncStorage.removeItem('auth_token');
        AsyncStorage.removeItem('auth_refreshToken');
      }
    });
  }
  if (networkError) {
    const { message, name } = networkError;
    console.log(`[Network error]: ${networkError}`, message, name);
  }
});

const restLink: any = new RestLink({
  uri: 'https://democracy-deutschland.de/api.php', // ?call=donation_status
});

const link = ApolloLink.from([
  retryLink,
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

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
