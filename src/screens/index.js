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
import NavBarLinks from "../hocs/NavBarLinks";
import SideMenuLinks from "../hocs/SideMenuLinks";

export default function registerScreens() {
  Navigation.registerComponent(
    "democracy.VoteList",
    () => DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteList)))),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteList.List",
    () => DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteListList)))),
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
    () => SideMenu,
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Detail",
    () => NetworkStatus(Detail, "Detail"),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Support",
    () => NetworkStatus(NavBarLinks(Support)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Security",
    () => NetworkStatus(NavBarLinks(Security)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.VoteVarification",
    () => NetworkStatus(NavBarLinks(VoteVarification)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Notifications",
    () => NetworkStatus(NavBarLinks(Notifications)),
    client.store,
    ApolloProvider,
    { client }
  );
  Navigation.registerComponent(
    "democracy.Credits",
    () => NetworkStatus(NavBarLinks(Credits)),
    client.store,
    ApolloProvider,
    { client }
  );
}
