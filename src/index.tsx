import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { client } from './api/apollo';
import { useInitialState } from './api/state/initialState';
import { NotificationsProvider } from './api/state/notificationPermission';
import { Routes } from './routes';
import { navigationTheme } from './routes/styles';
import { theme } from './styles/theme';

const AppEntry = () => {
  useInitialState();
  return (
    <ThemeProvider theme={theme}>
      <NotificationsProvider>
        <NavigationContainer theme={navigationTheme}>
          <Routes />
        </NavigationContainer>
      </NotificationsProvider>
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
