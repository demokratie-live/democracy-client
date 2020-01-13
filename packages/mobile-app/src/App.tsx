// import './lib/sentry';
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { LocalVotesProvider } from './context/LocalVotes';
import { Apollo } from './lib/Apollo';
import { ListFilterProvider } from './context/ListFilter';
import { ConstituencyProvider } from './context/Constituency';

export default () => (
  <Apollo>
    <InitialStateProvider>
      <LocalVotesProvider>
        <ListFilterProvider>
          <ConstituencyProvider>
            <Navigation />
          </ConstituencyProvider>
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
