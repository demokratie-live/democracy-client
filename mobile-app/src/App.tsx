import React from 'react';
import Navigation from './routes';
import { InitialStateProvider } from './context/InitialStates';

export default () => (
  <InitialStateProvider>
    <Navigation />
  </InitialStateProvider>
);
