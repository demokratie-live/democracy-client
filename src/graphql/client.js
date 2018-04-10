/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "__typename"] }] */
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import { setContext } from "apollo-link-context";
import { createNetworkStatusNotifier } from "react-apollo-network-status";

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

const { link: networkStatusNotifierLink } = createNetworkStatusNotifier({
  reducers: {
    onSuccess: (state, { operation }) => {
      const ignore = operation.query.definitions.some(definition =>
        definition.selectionSet.selections.some(section =>
          section.directives.some(
            directive =>
              directive.name.kind === "Name" &&
              directive.name.value === "client"
          )
        )
      );
      if (!ignore) {
        client.mutate({
          mutation: UPDATE_NETWORK_STATUS,
          variables: {
            requestError: ""
          }
        });
      }
    },
    onError: (state, { operation, networkError }) => {
      console.log(operation, networkError);
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          requestError: "Keine Verbindung zum Server"
        }
      });
    },
    onRequest: () => {},
    onCancel: () => {}
  }
});

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs });

const defaultOptions = {
  query: {
    fetchPolicy: "cache-and-network"
    // errorPolicy: "ignore"
  },
  mutate: {
    // errorPolicy: "ignore"
  }
};

client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    networkStatusNotifierLink,
    // linkError,
    authLink,
    stateLink,
    new HttpLink({ uri: Config.GRAPHQL_URL })
  ]),
  defaultOptions
});
export default client;

// offline cache löschen
persistor.purge();

export { persistor };
