import React from 'react';
import { useScreens } from 'react-native-screens';
useScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';
import { Apollo } from './lib/Apollo';

export default () => (
  <Apollo testID="Apollo-test-id">
    <InitialStateProvider>
      <Navigation />
    </InitialStateProvider>
  </Apollo>
);
