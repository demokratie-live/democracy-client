// @flow
import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import client from "../graphql/client";

import App from "./App";

export default function registerScreens() {
  Navigation.registerComponent(
    "example.FirstTabScreen",
    () => App,
    client.store,
    ApolloProvider,
    { client }
  );
}
