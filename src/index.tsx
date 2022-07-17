import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { client } from './api/apollo';
import { useInitialState } from './api/state/initialState';
import { NotificationsProvider } from './api/state/notificationPermission';
import { VerificationProvider } from './api/state/Verification';
import { Routes } from './routes';
import { navigationTheme } from './routes/styles';
import { theme } from './styles/theme';

const AppEntry = () => {
  useInitialState();
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} />
      <NotificationsProvider>
        <NavigationContainer theme={navigationTheme}>
          <VerificationProvider>
            <Suspense fallback={null}>
              <Routes />
            </Suspense>
          </VerificationProvider>
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
