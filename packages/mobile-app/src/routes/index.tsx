import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext, useEffect } from 'react';
import {
  useLinking,
  NavigationNativeContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
import Verification from './Verification';
import { InitialStateContext } from '../context/InitialStates';
import { VerificationProvider } from '../context/Verification';
import DeviceInfo from 'react-native-device-info';
import { InitialState } from '@react-navigation/core';
import { SidebarNavigation } from './Sidebar';
import { PdfScreen } from '../screens/modals/Pdf/Pdf';
import { ConstituencyScreen } from '../screens/modals/Constituency';
import { rootNavigationRef } from './rootNavigationRef';
import { getNavInitStateForProcedure } from '../lib/getNavStateForProcedure';
import { PushNotificationContext } from '../context/PushNotification';
import SplashScreen from 'react-native-splash-screen';
import { theme } from '../styles';

export type RootStackParamList = {
  Sidebar: undefined;
  Home: {};
  Introduction: { done?: () => void; lastStartWithVersion?: string };
  Verification: {};
  Pdf: { url: string };
  Constituency: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
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
    getInitialState().then(state => {
      // democracy://Sidebar/Bundestag/Procedure?procedureId=230576
      if (state !== undefined) {
        setInitialState(state);
      }

      setIsReady(true);
    });
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
    <NavigationNativeContainer
      initialState={initialState}
      ref={rootNavigationRef}
      theme={{
        colors: {
          background: '#fff',
          primary: '#fff',
          text: '#fff',
          border: '#fff',
          card: '#fff',
        },
        dark: false,
      }}>
      <RootStack.Navigator
        mode="modal"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.background.header,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.headerText,
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

export default Navigation;
