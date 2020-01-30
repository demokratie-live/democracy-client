import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext, useEffect } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
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
  const [currentVersion, setCurrentVersion] = useState();
  const {
    lastStartWithVersion,
    setLastStartWithVersion,
    isVerified,
  } = useContext(InitialStateContext);

  useEffect(() => {
    setCurrentVersion(DeviceInfo.getVersion());
    SplashScreen.hide();
  }, []);

  if (lastStartWithVersion === undefined || currentVersion === undefined) {
    return null;
  }

  const initialState: InitialState = {
    routes: [
      {
        name: 'Sidebar',
      },
    ],
  };
  if (currentVersion !== lastStartWithVersion) {
    initialState.routes.push({
      name: 'Introduction',
      params: {
        done: () => setLastStartWithVersion(currentVersion),
        lastStartWithVersion,
      },
    });
  }

  return (
    <NavigationNativeContainer initialState={initialState}>
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
            title: 'Wahlkreisssuche',
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
