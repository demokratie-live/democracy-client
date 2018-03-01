// @flow
import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import client from "../graphql/client";

import VoteList from "./VoteList";
import VoteListList from "./VoteList/List";
import Instructions from "./Instructions";
import Search from "./Search";
import SideMenu from "./SideMenu";
import Detail from "./Detail";
import Support from "./Support";
import Security from "./Security";

export default function registerScreens() {
  Navigation.registerComponent(
    "democracy.VoteList",
    () => VoteList,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteList.List",
    () => VoteListList,
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
  Navigation.registerComponent(
    "democracy.Search",
    () => Search,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.SideMenu",
    () => SideMenu,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Detail",
    () => Detail,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Support",
    () => Support,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Security",
    () => Security,
    client.store,
    ApolloProvider,
    { client }
  );
}
