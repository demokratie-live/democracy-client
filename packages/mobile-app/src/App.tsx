import './lib/sentry';
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { LocalVotesProvider } from './context/LocalVotes';
import { Apollo } from './lib/Apollo';
import { ListFilterProvider } from './context/ListFilter';
import { ConstituencyProvider } from './context/Constituency';
import { NotificationsProvider } from './context/NotificationPermission';
import { PushNotificationProvider } from './context/PushNotification';

export default () => (
  <Apollo>
    <InitialStateProvider>
      <LocalVotesProvider>
        <ListFilterProvider>
          <ConstituencyProvider>
            <NotificationsProvider>
              <PushNotificationProvider>
                <Navigation />
              </PushNotificationProvider>
            </NotificationsProvider>
          </ConstituencyProvider>
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
