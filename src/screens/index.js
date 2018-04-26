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
import Credits from "./Credits";

import DeepLink from "../hocs/DeepLink";
import NetworkStatus from "../hocs/NetworkStatus";

export default function registerScreens() {
  Navigation.registerComponent(
    "democracy.VoteList",
    () => DeepLink(NetworkStatus(VoteList)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteList.List",
    () => DeepLink(NetworkStatus(VoteListList)),
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
    () => DeepLink(NetworkStatus(Search)),
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
    () => NetworkStatus(Detail),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Support",
    () => DeepLink(NetworkStatus(Support)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Security",
    () => DeepLink(NetworkStatus(Security)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteVarification",
    () => NetworkStatus(VoteVarification),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Notifications",
    () => DeepLink(NetworkStatus(Notifications)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Credits",
    () => DeepLink(NetworkStatus(Credits)),
    client.store,
    ApolloProvider,
    { client }
  );
}
