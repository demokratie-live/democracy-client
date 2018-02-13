// @flow
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import Config from "react-native-config";

import { defaults, resolvers } from "./resolvers";

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: false
});

const stateLink = withClientState({ resolvers, cache, defaults });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, new HttpLink({ uri: Config.GRAPHQL_URL })])
});
export default client;
// offline cache löschen
persistor.purge();
export { persistor };
