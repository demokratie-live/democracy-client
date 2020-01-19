import React, { FC } from 'react';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { NativeModules } from 'react-native';
import { ApolloLink } from 'apollo-link';
import { authLinkMiddleware, authLinkAfterware } from './Auth';
import { GRAPHQL_URL, GRAPHQL_SERVER_LOCAL } from '../config';

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

const link = ApolloLink.from([authLinkMiddleware, authLinkAfterware, httpLink]);

const client = new ApolloClient({
  cache,
  link,
});

export const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);
