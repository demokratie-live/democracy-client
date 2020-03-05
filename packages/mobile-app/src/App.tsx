import './lib/sentry';
import 'proxy-polyfill';
import './lib/polyfills/string.polyfill.js';
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
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
                  <ThemeProvider theme={theme}>
                    <Navigation />
                  </ThemeProvider>
                </VerificationProvider>
              </PushNotificationProvider>
            </NotificationsProvider>
          </ConstituencyProvider>
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
