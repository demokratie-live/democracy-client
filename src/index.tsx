import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { client } from './api/apollo';
import { useInitialState } from './api/state/initialState';
import { Routes } from './routes';
import { ThemeProvider } from './styles/styled-components';
import { theme } from './styles/theme';

console.log('askdf', client);

const AppEntry = () => {
  useInitialState();
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <AppEntry />
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default App;
