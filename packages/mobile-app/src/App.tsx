import React from 'react';
import { useScreens } from 'react-native-screens';
useScreens();
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';

export default () => (
  <InitialStateProvider>
    <Navigation />
  </InitialStateProvider>
);
