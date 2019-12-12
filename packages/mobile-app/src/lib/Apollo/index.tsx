import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { Platform } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { authLinkMiddleware, authLinkAfterware } from './Auth';

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

let graphQlUri = 'https://alpha.api.democracy-app.de';
if (process.env.NODE_ENV === 'development') {
  graphQlUri =
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3000'
      : 'http://localhost:3000';
}

const httpLink = new HttpLink({
  uri: graphQlUri,
});

const link = ApolloLink.from([authLinkMiddleware, authLinkAfterware, httpLink]);

const client = new ApolloClient({
  cache,
  link,
});

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
