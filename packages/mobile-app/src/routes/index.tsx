import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import React, { useState, useContext } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Introduction from '../screens/modals/Introduction';
import Verification from '../screens/modals/Verification';
import { InitialStateContext } from '../context/InitialStates';
import DeviceInfo from 'react-native-device-info';
import { InitialState } from '@react-navigation/core';
import { SidebarNavigation } from './Sidebar';
import { rootNavigationRef } from './Root';

export type RootStackParamList = {
  Sidebar: { registered?: boolean };
  Home: {};
  Introduction: { done?: () => void; lastStartWithVersion?: string };
  Verification: {};
};

const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [currentVersion, setCurrentVersion] = useState();
  const {
    lastStartWithVersion,
    setLastStartWithVersion,
    registered,
  } = useContext(InitialStateContext);

  DeviceInfo.getVersion().then(setCurrentVersion);

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
    <NavigationNativeContainer
      initialState={initialState}
      ref={rootNavigationRef}
      independent>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen
          name="Sidebar"
          component={SidebarNavigation}
          initialParams={{ registered }}
        />
        <RootStack.Screen name="Introduction" component={Introduction} />
        <RootStack.Screen name="Verification" component={Verification} />
      </RootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default App;
