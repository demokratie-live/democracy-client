import React from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'https://api.democracy-app.de/',
});

const client = new ApolloClient({
  cache,
  link,
});

export const Apollo = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
