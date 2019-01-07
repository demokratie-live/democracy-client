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
import Profil from './Profil';
import Constituency from './Profil/Constituency';
import Faq from './Faq';
import Imprint from './Imprint';
import About from './About';
import Donate from './Donate';
import TermsOfUse from './TermsOfUse';
import Statistic from './Statistic';
import VoteVarification from './VoteVarification';
import Notifications from './Notifications';
import WahlOMeter from './WahlOMeter';

import Pdf from '../components/Pdf';
import InAppNotification from './Notifications/InAppNotification';
import SmsVerification from './SmsVerification';
import SmsVerificationPhoneNumber from './SmsVerification/PhoneNumber';
import SmsVerificationCode from './SmsVerification/Code';
import SmsVerificationSuccess from './SmsVerification/Success';
import SmsVerificationError from './SmsVerification/Error';
import BetaEnd from './BetaEnd';

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
    'democracy.Faq',
    () => NetworkStatus(NavBarLinks(Faq)),
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
    'democracy.Profil',
    () => NetworkStatus(NavBarLinks(Profil)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Profil.Constituency',
    () => NetworkStatus(NavBarLinks(Constituency)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Imprint',
    () => NetworkStatus(NavBarLinks(Imprint)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.About',
    () => NetworkStatus(NavBarLinks(About)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.Donate',
    () => NetworkStatus(NavBarLinks(Donate)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent(
    'democracy.TermsOfUse',
    () => NetworkStatus(NavBarLinks(TermsOfUse)),
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
    'democracy.SmsVerification.Success',
    () => SmsVerificationSuccess,
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
  Navigation.registerComponent(
    'democracy.WahlOMeter',
    () => NetworkStatus(NavBarLinks(WahlOMeter)),
    client.store,
    ApolloProvider,
    { client },
  );
  Navigation.registerComponent('democracy.BetaEnd', () => BetaEnd, client.store, ApolloProvider, {
    client,
  });
}
