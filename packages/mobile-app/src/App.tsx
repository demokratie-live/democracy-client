// import './lib/sentry';
import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { LocalVotesProvider } from './context/LocalVotes';
import { Apollo } from './lib/Apollo';
import { ListFilterProvider } from './context/ListFilter';

export default () => (
  <Apollo>
    <InitialStateProvider>
      <LocalVotesProvider>
        <ListFilterProvider>
          <Navigation />
        </ListFilterProvider>
      </LocalVotesProvider>
    </InitialStateProvider>
  </Apollo>
);
