import React from "react";
import { ApolloProvider } from "react-apollo";

import apolloClient from "../graphql/client";

export default (Component, store = apolloClient.store, client = apolloClient) =>
  class extends React.Component {
    render() {
      return (
        <ApolloProvider store={store} client={client}>
          <Component {...this.props} />
        </ApolloProvider>
      );
    }
  };
