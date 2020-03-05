import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext, useEffect } from 'react';
import { useLinking, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
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
import { theme } from '../styles';
import { StatusBar } from 'react-native';
import { PushInstructions } from '../screens/modals/Introduction/PushInstructions';
import { NotificationInstructionScreen } from '../screens/modals/NotificationInstruction';
import { VerificationStart } from '../screens/modals/Verification/Start';
import { PhoneNumber } from '../screens/modals/Verification/PhoneNumber';
import { Code } from '../screens/modals/Verification/Code';
import { SmsDonate } from '../screens/modals/Verification/Donate';

export type RootStackParamList = {
  Sidebar: undefined;
  Home: {};
  Introduction: { done?: string; lastStartWithVersion?: string };
  PushInstructions: {};
  Pdf: { url: string; title: string };
  NotificationInstruction: { done: () => void };
  Constituency: { goBack?: boolean };
  // Verification
  // Verification: { procedureId?: string };
  VerificationStart: { procedureId?: string };
  PhoneNumberInput: { procedureId?: string };
  SmsCodeInput: { procedureId?: string };
  SmsDonate: undefined;
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
      });
    },
  });

  const [isInitialReady, setIsInitialReady] = React.useState(false);
  const [isPushReady, setIsPushReady] = React.useState(false);
  const [isIntroductionReady, setIsIntroductionReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState>();

  const [currentVersion, setCurrentVersion] = useState();
  const { lastStartWithVersion, setLastStartWithVersion } = useContext(
    InitialStateContext,
  );

  useEffect(() => {
    getInitialState().then(state => {
      // democracy://Sidebar/Bundestag/Procedure?procedureId=230576
      if (state && state.routes) {
        setInitialState(state);
      }

      setIsInitialReady(true);
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
              done: 'SET_LAST_START_VERSION',
              lastStartWithVersion,
            },
          },
        ],
      });
    }
    if (lastStartWithVersion !== undefined && currentVersion !== undefined) {
      setIsIntroductionReady(true);
    }
  }, [currentVersion, lastStartWithVersion, setLastStartWithVersion]);

  // call if app opened by push notification
  useEffect(() => {
    if (initialNotification) {
      setInitialState(
        getNavInitStateForProcedure({
          procedureId: initialNotification.procedureId,
        }),
      );
    }
    setIsPushReady(true);
  }, [initialNotification]);

  if (
    lastStartWithVersion === undefined ||
    currentVersion === undefined ||
    initialNotification === undefined ||
    !isInitialReady ||
    !isPushReady ||
    !isIntroductionReady
  ) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <NavigationContainer
        initialState={initialState}
        // onStateChange={state => console.log(JSON.stringify(state))}
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
          <RootStack.Screen
            name="Pdf"
            component={PdfScreen}
            options={({ route }) => ({ title: route.params.title })}
          />
          <RootStack.Screen
            name="NotificationInstruction"
            component={NotificationInstructionScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Constituency"
            component={ConstituencyScreen}
            options={{
              title: 'Wahlkreissuche',
            }}
          />
          <RootStack.Screen
            name="PushInstructions"
            options={{
              headerShown: false,
            }}
            component={PushInstructions}
          />
          {/* Verification */}
          <RootStack.Screen
            name="VerificationStart"
            component={VerificationStart}
            options={{
              headerTitle: 'Verifizieren',
            }}
          />
          <RootStack.Screen
            name="PhoneNumberInput"
            component={PhoneNumber}
            options={{
              headerTitle: 'Verifizieren',
              headerBackTitle: 'Zurück',
            }}
          />
          <RootStack.Screen
            name="SmsCodeInput"
            component={Code}
            options={{
              headerTitle: 'Verifizieren',
              headerBackTitle: 'Zurück',
            }}
          />
          <RootStack.Screen
            name="SmsDonate"
            component={SmsDonate}
            options={{
              headerTitle: 'Spenden',
              headerShown: false,
              headerBackTitleVisible: false,
              headerBackTitleStyle: {
                color: 'red',
              },
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigation;
