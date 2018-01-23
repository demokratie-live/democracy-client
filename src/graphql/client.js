// @flow
import { AsyncStorage } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";

import { defaults, resolvers } from "./resolvers";

const cache = new InMemoryCache();

const persistor = new CachePersistor({
  cache,
  storage: AsyncStorage,
  debug: true
});

const stateLink = withClientState({ resolvers, cache, defaults });

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([stateLink, new HttpLink()])
});
export default client;
export { persistor };
