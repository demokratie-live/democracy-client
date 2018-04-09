/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "__typename"] }] */
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";

import Config from "../config";

import { defaults, resolvers } from "./resolvers";
import typeDefs from "./schemas";

import UPDATE_NETWORK_STATUS from "../graphql/mutations/updateNetworkStatus";

let client; // eslint-disable-line

const cache = new InMemoryCache({
  dataIdFromObject: o => {
    switch (o.__typename) {
      case "Procedure":
        return o.procedureId;

      default:
        return o._id;
    }
  }
});

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: true,
  debounce: 1000
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("authorization");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null
    }
  };
});

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs });
const linkError = onError(
  ({ graphQLErrors, networkError, response, operation, ...rest }) => {
    if (networkError.message === "Network request failed") {
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          requestError: "Keine Verbindung zum Server"
        }
      });
    } else {
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          requestError: networkError.message
        }
      });
    }
    if (operation.operationName === "IgnoreErrorsQuery") {
      response.errors = null;
    }
    console.log({ graphQLErrors, networkError, response, operation, ...rest });
    if (graphQLErrors)
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });

    if (networkError) console.log(`[Network error]: ${networkError}`);
  }
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "cache-and-network"
    // errorPolicy: "ignore"
  },
  query: {
    fetchPolicy: "cache-and-network"
    // errorPolicy: "ignore"
  },
  mutate: {
    errorPolicy: "ignore"
  }
};

client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    linkError,
    authLink,
    stateLink,
    new HttpLink({ uri: Config.GRAPHQL_URL })
  ]),
  defaultOptions
});
export default client;

// offline cache löschen
// persistor.purge();

export { persistor };
