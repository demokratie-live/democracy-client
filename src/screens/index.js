import { Navigation } from 'react-native-navigation';
import { ApolloProvider } from 'react-apollo';

import client from '../graphql/client';

import VoteList from './VoteList';
import VoteListList from './VoteList/List';
import VoteListFilter from './VoteList/Filter';
import Instructions from './Instructions';
import Search from './Search';
import SideMenu from './SideMenu';
import Detail from './Detail';
import Support from './Support';
import Security from './Security';
import Statistic from './Statistic';
import VoteVarification from './VoteVarification';
import Notifications from './Notifications';
import Credits from './Credits';
import Pdf from '../components/Pdf';
import InAppNotification from './Notifications/InAppNotification';
import SmsVerification from './SmsVerification';
import SmsVerificationPhoneNumber from './SmsVerification/PhoneNumber';
import SmsVerificationCode from './SmsVerification/Code';
import SmsVerificationError from './SmsVerification/Error';

import DeepLink from '../hocs/DeepLink';
import NetworkStatus from '../hocs/NetworkStatus';
import NavBarLinks from '../hocs/NavBarLinks';
import SideMenuLinks from '../hocs/SideMenuLinks';
import PushNotifications from '../hocs/PushNotifications';

export default function registerScreens() {
  Navigation.registerComponent(
    'democracy.VoteList',
    () => PushNotifications(DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteList))))),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.VoteList.List',
    () => PushNotifications(DeepLink(NavBarLinks(SideMenuLinks(NetworkStatus(VoteListList))))),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.VoteList.Filter',
    () => VoteListFilter,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Instructions',
    () => Instructions,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Search',
    () => NetworkStatus(Search),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent('democracy.SideMenu', () => SideMenu, client.store, ApolloProvider, {
    client,
  });
  Navigation.registerComponent(
    'democracy.Detail',
    () => NetworkStatus(Detail, 'Detail'),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Support',
    () => NetworkStatus(NavBarLinks(Support)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Statistic',
    () => NetworkStatus(NavBarLinks(Statistic)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Security',
    () => NetworkStatus(NavBarLinks(Security)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.VoteVarification',
    () => NetworkStatus(NavBarLinks(VoteVarification)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Notifications',
    () => NetworkStatus(NavBarLinks(Notifications)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Credits',
    () => NetworkStatus(NavBarLinks(Credits)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent('democracy.Pdf', () => Pdf, client.store, ApolloProvider, {
    client,
  });

  Navigation.registerComponent(
    'democracy.Notifications.InApp',
    () => InAppNotification,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.SmsVerification',
    () => SmsVerification,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.SmsVerification.PhoneNumber',
    () => SmsVerificationPhoneNumber,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.SmsVerification.Code',
    () => SmsVerificationCode,
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.SmsVerification.Error',
    () => SmsVerificationError,
    client.store,
    ApolloProvider,
    { client },
  );
}
