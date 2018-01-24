// @flow
import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import client from "../graphql/client";

import VoteList from "./VoteList";
import Instructions from "./Instructions";

export default function registerScreens() {
  Navigation.registerComponent(
    "democracy.VoteList",
    () => VoteList,
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
