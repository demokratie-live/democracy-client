import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext, useEffect } from 'react';
import { useLinking, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
import { VerificationScreen } from './Verification';
import { InitialStateContext } from '../context/InitialStates';
import DeviceInfo from 'react-native-device-info';
import { InitialState } from '@react-navigation/core';
import { SidebarNavigation } from './Sidebar';
import { PdfScreen } from '../screens/modals/Pdf/Pdf';
import { ConstituencyScreen } from '../screens/modals/Constituency';
import { rootNavigationRef } from './rootNavigationRef';
import { getNavInitStateForProcedure } from '../lib/getNavStateForProcedure';
import { PushNotificationContext } from '../context/PushNotification';
import SplashScreen from 'react-native-splash-screen';

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
  const { initialNotification } = useContext(PushNotificationContext);
  const { getInitialState } = useLinking(rootNavigationRef, {
    prefixes: ['https://democracy-app.de', 'democracy://'],
    getStateFromPath: path => {
      return getNavInitStateForProcedure({
        // TODO make this deeplinking more save
        procedureId: path.substr(path.length - 6),
        title: 'getStateFromPath',
      });
    },
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
    const state = getInitialState();
    // democracy://Sidebar/Bundestag/Procedure?procedureId=230576
    if (state && state.routes) {
      setInitialState(state);
    }

    setIsReady(true);
  }, [getInitialState]);

  useEffect(() => {
    setCurrentVersion(DeviceInfo.getVersion());
    SplashScreen.hide();
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

  // call if app opened by push notification
  useEffect(() => {
    if (initialNotification) {
      setInitialState(
        getNavInitStateForProcedure({
          procedureId: initialNotification.procedureId,
          title: initialNotification.title,
        }),
      );
    }
  }, [initialNotification]);

  if (
    lastStartWithVersion === undefined ||
    currentVersion === undefined ||
    initialNotification === undefined ||
    !isReady
  ) {
    return null;
  }

  return (
    <NavigationContainer initialState={initialState} ref={rootNavigationRef}>
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
            component={VerificationScreen}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
