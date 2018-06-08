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
import RSAKey from "react-native-rsa";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import Config from "react-native-config";

import Configuration from "../config";

import { defaults, resolvers } from "./resolvers";
import typeDefs from "./schemas";

import UPDATE_NETWORK_STATUS from "../graphql/mutations/updateNetworkStatus";
import ME from "../graphql/queries/me";
import SIGN_UP from "../graphql/mutations/signUp";

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
  maxSize: false
});

const getNewToken = async () => {
  const rsa = new RSAKey();
  rsa.setPublicString(Config.PUBLIC_KEY); // return json encoded string
  const uniqueID = await sha256(DeviceInfo.getUniqueID());
  const deviceHashEncrypted = rsa.encrypt(uniqueID);

  try {
    const { data } = await client.mutate({
      mutation: SIGN_UP,
      variables: {
        deviceHashEncrypted
      }
    });

    await AsyncStorage.setItem("authorization", data.signUp.token);
  } catch (error) {
    // TODO: Show later a message that user is not registered
  }
};

let me = null;

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await AsyncStorage.getItem("authorization");
  if (_.operationName !== "me" && _.operationName !== "signUp") {
    if (!token && _.operationName !== "signUp") {
      await getNewToken();
    } else if (!me) {
      try {
        me = await client
          .query({
            query: ME,
            fetchPolicy: "network-only"
          })
          .then(({ data }) => data.me);
        if (!me) {
          await getNewToken();
        }
      } catch (error) {
        // TODO: handle this
      }
    }
  }
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
    onRequest: () => {},
    onCancel: () => {}
  }
});

const stateLink = withClientState({ resolvers, cache, defaults, typeDefs });

client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    networkStatusNotifierLink,
    authLink,
    stateLink,
    new HttpLink({ uri: Configuration.GRAPHQL_URL })
  ])
});
export default client;

// offline cache löschen
// persistor.purge();

export { persistor };
