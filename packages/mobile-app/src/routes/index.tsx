import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext, useEffect } from 'react';
import {
  NavigationNativeContainer,
  useLinking,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
import Verification from './Verification';
import { InitialStateContext } from '../context/InitialStates';
import { VerificationProvider } from '../context/Verification';
import DeviceInfo from 'react-native-device-info';
import { NavigationContainerRef, InitialState } from '@react-navigation/core';
import { SidebarNavigation } from './Sidebar';
import { PdfScreen } from '../screens/modals/Pdf/Pdf';
import { ConstituencyScreen } from '../screens/modals/Constituency';

export type RootStackParamList = {
  Sidebar: undefined;
  Home: {};
  Introduction: { done?: () => void; lastStartWithVersion?: string };
  Verification: {};
  Pdf: { url: string };
  Constituency: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const ref = React.createRef<NavigationContainerRef>();
  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://democracy-app.de', 'democracy://'],
  });

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState>();

  const [currentVersion, setCurrentVersion] = useState();
  const {
    lastStartWithVersion,
    setLastStartWithVersion,
    isVerified,
  } = useContext(InitialStateContext);

  useEffect(() => {
    getInitialState().then(state => {
      console.log('initialState', JSON.stringify(state, null, 2));
      // democracy://Sidebar/Bundestag/Procedure?procedureId=230576
      if (state !== undefined) {
        setInitialState({
          ...state,
          routes: [
            {
              name: 'Sidebar',
              state: {
                routes: [
                  {
                    name: 'Bundestag',
                    state: {
                      routes: [
                        {
                          name: 'TabView',
                        },
                        // ...state.routes[0].state!.routes[0].state!.routes,
                        {
                          name: 'Procedure',
                          params: {
                            procedureId: '230295',
                            title: 'Antrag',
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              name: 'Sidebar',
              state: {
                routes: [
                  {
                    name: 'Bundestag',
                    state: {
                      routes: [
                        {
                          name: 'TabView',
                        },
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        ...state.routes[0].state!.routes[0].state!.routes,
                      ],
                    },
                  },
                ],
              },
            },
          ],
        });
      }

      setIsReady(true);
    });
  }, [getInitialState]);

  useEffect(() => {
    setCurrentVersion(DeviceInfo.getVersion());
  }, []);

  useEffect(() => {
    if (
      lastStartWithVersion !== undefined &&
      currentVersion !== undefined &&
      currentVersion !== lastStartWithVersion
    ) {
      setInitialState({
        routes: [
          {
            name: 'Sidebar',
          },
          {
            name: 'Introduction',
            params: {
              done: () => setLastStartWithVersion(currentVersion),
              lastStartWithVersion,
            },
          },
        ],
      });
    }
  }, [currentVersion, lastStartWithVersion, setLastStartWithVersion]);

  if (
    lastStartWithVersion === undefined ||
    currentVersion === undefined ||
    !isReady
  ) {
    return null;
  }

  return (
    <NavigationNativeContainer initialState={initialState} ref={ref}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4494d3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
        }}>
        <RootStack.Screen
          name="Sidebar"
          component={SidebarNavigation}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Introduction"
          component={Introduction}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Pdf" component={PdfScreen} />
        <RootStack.Screen
          name="Constituency"
          component={ConstituencyScreen}
          options={{
            title: 'Wahlkreissuche',
          }}
        />
        {!isVerified && (
          <RootStack.Screen
            name="Verification"
            options={{
              headerShown: false,
            }}
            component={() => (
              <VerificationProvider>
                <Verification />
              </VerificationProvider>
            )}
          />
        )}
      </RootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
