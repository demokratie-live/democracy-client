import { Navigation } from "react-native-navigation";
import { ApolloProvider } from "react-apollo";

import "../components/NavigationIcon";

import client from "../graphql/client";
import withApollo from "../lib/withApollo";

import VoteList from "./VoteList";
import VoteListList from "./VoteList/List";
import VoteListFilter from "./VoteList/Filter";
import Instructions from "./Instructions";
import Search from "./Search";
import SideMenu from "./SideMenu";
import Detail from "./Detail";
import Support from "./Support";
import Security from "./Security";
import VoteVarification from "./VoteVarification";
import Notifications from "./Notifications";
import Credits from "./Credits";
import Pdf from "../components/Pdf";
import InAppNotification from "./Notifications/InAppNotification";

import DeepLink from "../hocs/DeepLink";
import NetworkStatus from "../hocs/NetworkStatus";
import NavBarLinks from "../hocs/NavBarLinks";
import SideMenuLinks from "../hocs/SideMenuLinks";
import PushNotifications from "../hocs/PushNotifications";

export default function registerScreens() {
  Navigation.registerComponent("democracy.VoteList", () =>
    withApollo(
      PushNotifications(
        DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteList))))
      )
    )
  );
  Navigation.registerComponent("democracy.VoteList.List", () =>
    withApollo(
      PushNotifications(
        DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteListList))))
      )
    )
  );
  Navigation.registerComponent("democracy.VoteList.Filter", () =>
    withApollo(VoteListFilter)
  );
  Navigation.registerComponent("democracy.Instructions", () =>
    withApollo(Instructions)
  );
  Navigation.registerComponent("democracy.Search", () =>
    withApollo(NetworkStatus(Search))
  );
  Navigation.registerComponent("democracy.SideMenu", () =>
    withApollo(SideMenu)
  );
  Navigation.registerComponent("democracy.Detail", () =>
    withApollo(NetworkStatus(Detail, "Detail"))
  );
  Navigation.registerComponent("democracy.Support", () =>
    withApollo(NetworkStatus(NavBarLinks(Support)))
  );
  Navigation.registerComponent("democracy.Security", () =>
    withApollo(NetworkStatus(NavBarLinks(Security)))
  );
  Navigation.registerComponent("democracy.VoteVarification", () =>
    withApollo(NetworkStatus(NavBarLinks(VoteVarification)))
  );
  Navigation.registerComponent("democracy.Notifications", () =>
    withApollo(NetworkStatus(NavBarLinks(Notifications)))
  );
  Navigation.registerComponent("democracy.Credits", () =>
    withApollo(NetworkStatus(NavBarLinks(Credits)))
  );
  Navigation.registerComponent("democracy.Pdf", () => withApollo(Pdf));

  Navigation.registerComponent("democracy.Notifications.InApp", () =>
    withApollo(InAppNotification)
  );
}
