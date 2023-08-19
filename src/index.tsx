import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import React, { Suspense } from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components/native';
import { client } from './api/apollo';
import { useHideBootsplash } from './api/hooks/useHideBootsplash';
import { useInitialState } from './api/state/initialState';
import { NotificationsProvider } from './api/state/notificationPermission';
import { VerificationProvider } from './api/state/Verification';
import { RootStackParamList, Routes } from './routes';
import { navigationTheme } from './routes/styles';
import { theme } from './styles/theme';
import { migrateAsyncStorageData } from './api/state/migration/01-native-async-storage';
import { getEnvironment } from './lib/getEnvironment';
import { ASSOCIATED_DOMAINS } from './api/config';

const AppEntry = () => {
  useInitialState();
  useHideBootsplash();
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle={'light-content'} />
      <NotificationsProvider>
        <NavigationContainer<RootStackParamList>
          theme={navigationTheme}
          linking={{
            prefixes: [
              ...ASSOCIATED_DOMAINS,
              `democracy${getEnvironment() === 'internal' ? '-internal' : ''}://`,
            ],
            config: {
              screens: {
                Sidebar: {
                  screens: {
                    Bundestag: {
                      screens: {
                        Sitzungswoche: {
                          path: '',
                        },
                        Vergangen: {
                          path: 'vergangen/',
                        },
                        'Top 100': {
                          path: 'top-100/',
                        },
                      },
                    },
                    Procedure: {
                      path: ':type/:procedureId/:title?',
                    },
                  },
                },
              },
            },
          }}
        >
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
  const [isMigrationDone, setIsMigraionDone] = React.useState<boolean>(false);
  React.useMemo(() => {
    migrateAsyncStorageData().then(() => {
      setIsMigraionDone(true);
    });
  }, []);

  if (!isMigrationDone) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <AppEntry />
      </RecoilRoot>
    </ApolloProvider>
  );
};

export default App;
