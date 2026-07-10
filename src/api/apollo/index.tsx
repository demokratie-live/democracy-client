import { RestLink } from "apollo-link-rest";
import { onError } from "@apollo/client/link/error";
import { authLinkMiddleware, authLinkAfterware } from "./Auth";
import { GRAPHQL_SERVER_LOCAL, GRAPHQL_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { versionLinkMiddleware } from "./Version";
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { typePolicies } from "./TypePolicies";
import { NativeModules } from "react-native";
import { applicationIdLinkMiddleware } from "./ApplicationId";
import { RetryLink } from "@apollo/client/link/retry";

const cache = new InMemoryCache({
  typePolicies,
});

let graphQlUri = GRAPHQL_URL;
if (process.env.NODE_ENV === "development" && GRAPHQL_SERVER_LOCAL) {
  // extract democracy api hostname from package bundler url
  const scriptURL = (NativeModules.SourceCode as { scriptURL: string })
    .scriptURL;
  const address = scriptURL.split("://")[1].split("/")[0];
  const hostname = address.split(":")[0];
  graphQlUri = `http://${hostname}:3000`;
}
console.log("GRAPHQL_URL", graphQlUri);
const httpLink = new HttpLink({
  uri: graphQlUri,
});

const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
          locations,
          null,
          4
        )}, Path: ${JSON.stringify(path)}`
      );

      if (message === "Permission Denied") {
        AsyncStorage.removeItem("auth_token").catch(console.error);
        AsyncStorage.removeItem("auth_refreshToken").catch(console.error);
      }
    });
  }
  if (networkError) {
    const { message, name } = networkError;
    console.log(
      `[Network error]: ${JSON.stringify(networkError)}`,
      message,
      name,
      operation
    );
  }
});

const retryLink = new RetryLink({
  delay: {
    initial: 500,
    max: 5000,
    jitter: true,
  },
  attempts: (count, operation, error) => {
    if (count >= 5) {
      return false;
    }

    if (!error) {
      return false;
    }

    if (error instanceof Error && !("statusCode" in (error as object))) {
      // Network-level failures from fetch (e.g., offline)
      return true;
    }

    const statusCode = (error as { statusCode?: number }).statusCode;

    if (!statusCode) {
      return false;
    }

    if (statusCode >= 500 && statusCode < 600) {
      return true;
    }

    return false;
  },
});

const restLink = new RestLink({
  uri: "https://democracy-deutschland.de/api.php", // ?call=donation_status
});

const link = ApolloLink.from([
  retryLink,
  errorLink,
  versionLinkMiddleware,
  applicationIdLinkMiddleware,
  authLinkMiddleware,
  authLinkAfterware,
  restLink,
  httpLink,
]);

export const client = new ApolloClient({
  cache,
  link,
});
