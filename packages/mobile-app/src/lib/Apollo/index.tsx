import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { NativeModules } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { RestLink } from 'apollo-link-rest';
import { onError } from 'apollo-link-error';
import { RetryLink } from 'apollo-link-retry';
import { authLinkMiddleware, authLinkAfterware } from './Auth';
import { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL } from '../config';
import { RetryFunction } from 'apollo-link-retry/lib/retryFunction';
import AsyncStorage from '@react-native-community/async-storage';

const cache = new InMemoryCache({
  dataIdFromObject: (o: any) => {
    switch (o.__typename) {
      case 'Procedure':
        return o.procedureId;

      default:
        return o._id;
    }
  },
});

let graphQlUri = GRAPHQL_URL;
if (process.env.NODE_ENV === 'development' && GRAPHQL_SERVER_LOCAL) {
  // extract democracy api hostname from package bundler url
  const scriptURL = NativeModules.SourceCode.scriptURL;
  const address = scriptURL.split('://')[1].split('/')[0];
  const hostname = address.split(':')[0];
  graphQlUri = `http://${hostname}:3000`;
}

const httpLink = new HttpLink({
  uri: graphQlUri,
});

// Retry link
const attempts: RetryFunction = (number, operation) => {
  console.log(number, operation.operationName);
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

const retryLink = new RetryLink({
  delay: {
    initial: 3000,
    max: 10000,
    jitter: true,
  },
  attempts,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
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

const restLink = new RestLink({
  uri: 'https://democracy-deutschland.de/api.php', // ?call=donation_status
});

const link = ApolloLink.from([
  retryLink,
  errorLink,
  authLinkMiddleware,
  authLinkAfterware,
  restLink,
  httpLink,
]);

const client = new ApolloClient({
  cache,

  link,
});

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
