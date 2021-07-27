import 'proxy-polyfill';
import './lib/polyfills/string.polyfill.js';
import React from 'react';
// TODO reanable it for performance
// import { Platform } from 'react-native';
// import { enableScreens } from 'react-native-screens';
// if (Platform.OS === 'ios') {
//   enableScreens();
// }
import { InitialStateProvider } from './context/InitialStates';
import { LocalVotesProvider } from './context/LocalVotes';
import { Apollo } from './lib/Apollo';
import { ListFilterProvider } from './context/ListFilter';
import { ConstituencyProvider } from './context/Constituency';
import { NotificationsProvider } from './context/NotificationPermission';
import { PushNotificationProvider } from './context/PushNotification';
import { theme, ThemeProvider } from './styles';
import Navigation from './routes/index';
import { VerificationProvider } from './context/Verification';
import { NavigationProvider } from './context/Navigation';
import { AbgeordneteListProvider } from './lib/states/Abgeordnete/context';
import { FavourizedDeputiesProvider } from './lib/states/FavorizedDeputies';
// import { ErrorScreen } from './screens/modals/Error';

export default () => (
  <Apollo>
    {/* <ErrorScreen /> */}
    <InitialStateProvider>
      <LocalVotesProvider>
        <ListFilterProvider>
          <ConstituencyProvider>
            <NotificationsProvider>
              <PushNotificationProvider>
                <VerificationProvider>
                  <AbgeordneteListProvider>
                    <FavourizedDeputiesProvider>
                      <NavigationProvider>
                        <ThemeProvider theme={theme}>
                          <Navigation />
                        </ThemeProvider>
                      </NavigationProvider>
                    </FavourizedDeputiesProvider>
                  </AbgeordneteListProvider>
                </VerificationProvider>
              </PushNotificationProvider>
            </NotificationsProvider>
          </ConstituencyProvider>
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
