/* eslint no-underscore-dangle: ["error", { "allow": ["_id", "__typename"] }] */
import { AsyncStorage, StatusBar, Platform } from "react-native";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { InMemoryCache } from "apollo-cache-inmemory";
import { CachePersistor } from "apollo-cache-persist";
import { setContext } from "apollo-link-context";
import { createNetworkStatusNotifier } from "react-apollo-network-status";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import jwtDecode from 'jwt-decode';

import Configuration from "../config";

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
  debug: false,
  debounce: 1000,
  // maxSize: false
});

const authLinkMiddleware = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("auth_token");
  const refreshToken = await AsyncStorage.getItem("auth_refreshToken");

  if (token && refreshToken) {
    const decodedToken = jwtDecode(token);
    const decodedRefreshToken = jwtDecode(refreshToken);

    const currentTime = Date.now() / 1000;
    if (decodedToken.exp >= currentTime || decodedRefreshToken.exp >= currentTime) {
      // Token valid
      return {
        headers: {
          ...headers,
          'x-token': token,
          'x-refresh-token': refreshToken,
        }
      };
    }
  }
  // No (valid) Token present - login
  const deviceHash = await sha256(DeviceInfo.getUniqueID());
  const phoneHash = await AsyncStorage.getItem("auth_phoneHash");
  const newHeaders = {
    ...headers,
    'x-device-hash': deviceHash,
  };
  if (phoneHash) {
    newHeaders['x-phone-hash'] = phoneHash;
  }
  return { headers: newHeaders };
});

const authLinkAfterware = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const res = operation.getContext().response;

    // Do we have a response?
    if (res) {
      const { headers } = res;
      // Do we have headers?
      if (headers) {
        // Extract tokens from Headers & save them
        const token = headers.get('x-token');
        const refreshToken = headers.get('x-refresh-token');
        if (token) {
          AsyncStorage.setItem("auth_token", token);
        }

        if (refreshToken) {
          AsyncStorage.setItem("auth_refreshToken", refreshToken);
        }

      }
    }
    return response;
  })
);

const { link: networkStatusNotifierLink } = createNetworkStatusNotifier({
  reducers: {
    onSuccess: (state, { operation }) => {
      const ignore = operation.query.definitions.some(definition =>
        definition.selectionSet.selections.some(
          section =>
            section.directives
              ? section.directives.some(
                directive =>
                  directive.name.kind === "Name" &&
                  directive.name.value === "client"
              )
              : false
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
    onError: () => {
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          requestError: "Keine Verbindung zum Server"
        }
      });
    },
    onRequest: () => { },
    onCancel: () => { }
  }
});

const networkActivity = {
  onRequest: 0,
  onFinish: 0
};

const { link: loadingIndicator } = createNetworkStatusNotifier({
  reducers: {
    onSuccess: () => {
      if (Platform.OS === "ios") {
        networkActivity.onFinish += 1;
        if (networkActivity.onFinish === networkActivity.onRequest) {
          StatusBar.setNetworkActivityIndicatorVisible(false);
        }
      }
    },
    onError: () => {
      if (Platform.OS === "ios") {
        networkActivity.onFinish += 1;
        if (networkActivity.onFinish === networkActivity.onRequest) {
          StatusBar.setNetworkActivityIndicatorVisible(false);
        }
      }
    },
    onRequest: () => {
      if (Platform.OS === "ios") {
        StatusBar.setNetworkActivityIndicatorVisible(true);
        networkActivity.onRequest += 1;
      }
    },
    onCancel: () => {
      if (Platform.OS === "ios") {
        networkActivity.onFinish += 1;
        if (networkActivity.onFinish === networkActivity.onRequest) {
          StatusBar.setNetworkActivityIndicatorVisible(false);
        }
      }
    }
  }
});

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs });

client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    loadingIndicator,
    networkStatusNotifierLink,
    authLinkMiddleware,
    authLinkAfterware,
    stateLink,
    new HttpLink({ uri: Configuration.GRAPHQL_URL })
  ])
});
export default client;

// offline cache löschen
// persistor.purge();

export { persistor };
