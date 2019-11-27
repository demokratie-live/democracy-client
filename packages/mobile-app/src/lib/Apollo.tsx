import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Platform } from 'react-native';

const cache = new InMemoryCache();

let graphQlUri = 'http://alpha.api.democracy-app.de';
if (process.env.NODE_ENV === 'development') {
  graphQlUri =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000';
}

const link = new HttpLink({
  uri: graphQlUri,
});

const client = new ApolloClient({
  cache,
  link,
});

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
