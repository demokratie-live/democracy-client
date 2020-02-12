// import './lib/sentry';
import 'proxy-polyfill';
import './lib/polyfills/string.polyfill.js';
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { LocalVotesProvider } from './context/LocalVotes';
import { Apollo } from './lib/Apollo';
import { ListFilterProvider } from './context/ListFilter';
import { ConstituencyProvider } from './context/Constituency';
import { NotificationsProvider } from './context/Notifications';
import { theme, ThemeProvider } from './styles';

export default () => (
  <Apollo>
    <InitialStateProvider>
      <LocalVotesProvider>
        <ListFilterProvider>
          <ConstituencyProvider>
            <NotificationsProvider>
              <ThemeProvider theme={theme}>
                <Navigation />
              </ThemeProvider>
            </NotificationsProvider>
          </ConstituencyProvider>
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
