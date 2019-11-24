import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://127.0.0.1:3000',
});

const client = new ApolloClient({
  cache,
  link,
});

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
