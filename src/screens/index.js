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
import VoteVarification from "./VoteVarification";
import Notifications from "./Notifications";

import NetworkStatus from "../hocs/NetworkStatus";

export default function registerScreens() {
  Navigation.registerComponent(
    "democracy.VoteList",
    () => NetworkStatus(VoteList),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteList.List",
    () => NetworkStatus(VoteListList),
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
    () => NetworkStatus(Search),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.SideMenu",
    () => NetworkStatus(SideMenu),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Detail",
    () => NetworkStatus(Detail),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Support",
    () => NetworkStatus(Support),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Security",
    () => NetworkStatus(Security),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteVarification",
    () => VoteVarification,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Notifications",
    () => NetworkStatus(Notifications),
    client.store,
    ApolloProvider,
    { client }
  );
}
