// @flow
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import Config from "react-native-config";
// import { onError } from "apollo-link-error";

import { defaults, resolvers } from "./resolvers";

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: false
});

const stateLink = withClientState({ resolvers, cache, defaults });
// const linkError = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors)
//     graphQLErrors.map(({ message, locations, path }) => {
//       console.log(
//         `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//       );
//     });

//   if (networkError) console.log(`[Network error]: ${networkError}`);
// });

// const defaultOptions = {
//   watchQuery: {
//     fetchPolicy: "cache-and-network",
//     errorPolicy: "ignore"
//   },
//   query: {
//     fetchPolicy: "network-only",
//     errorPolicy: "all"
//   },
//   mutate: {
//     errorPolicy: "all"
//   }
// };

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    // linkError,
    stateLink,
    new HttpLink({ uri: Config.GRAPHQL_URL })
  ])
  // defaultOptions
});
export default client;
// offline cache löschen
// persistor.purge();
export { persistor };
