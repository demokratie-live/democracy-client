// @flow
import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import client from "../graphql/client";

import App from "./App";
import Instructions from "./Instructions";

export default function registerScreens() {
  Navigation.registerComponent(
    "example.FirstTabScreen",
    () => App,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Instructions",
    () => Instructions,
    client.store,
    ApolloProvider,
    { client }
  );
}
