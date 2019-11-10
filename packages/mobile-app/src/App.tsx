import React from 'react';
import { enableScreens } from 'react-native-screens';
enableScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { Apollo } from './lib/Apollo';

export default () => (
  <Apollo>
    <InitialStateProvider>
      <Navigation />
    </InitialStateProvider>
  </Apollo>
);
