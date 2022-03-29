import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Introduction from '../screens/Introduction';
import { useInitialState } from '../api/state/initialState';
import { getVersion } from 'react-native-device-info';
import { SidebarNavigation } from './Sidebar';
import { PlaceholderScreen } from '../screens/Placeholder';
import { SyncVotesScreen } from '../screens/SyncVotes';
import { lightTheme } from '@democracy-deutschland/ui';
import { SyncVotesCaptureScreen } from '../screens/SyncVotesCapture';

export type RootStackParamList = {
  Sidebar: undefined;
  Introduction?: { done?: string; lastStartWithVersion?: string };
  VerificationStart: undefined;
  Constituency: undefined;
  SyncVotes: undefined;
  SyncVotesCapture: undefined;
  PlaceholderScreen: { title: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  const { lastStartWithVersion } = useInitialState();

  if (lastStartWithVersion === undefined) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={lastStartWithVersion !== getVersion() ? 'Introduction' : 'Sidebar'}
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: lightTheme.colors.primary,
        },
        headerTintColor: lightTheme.colors.text.secondary,
      }}
    >
      <Stack.Screen
        name="Introduction"
        initialParams={{ lastStartWithVersion: '', done: 'SET_LAST_START_VERSION' }}
        component={Introduction}
      />
      <Stack.Screen name="Sidebar" component={SidebarNavigation} />
      <Stack.Screen name="Constituency" component={PlaceholderScreen} />
      <Stack.Screen name="VerificationStart" component={PlaceholderScreen} />
      <Stack.Screen
        name="SyncVotes"
        component={SyncVotesScreen}
        options={{ headerShown: true, title: 'Stimmen übertragen' }}
      />
      <Stack.Screen
        name="SyncVotesCapture"
        component={SyncVotesCaptureScreen}
        options={{ headerShown: true, title: 'Stimmen empfangen' }}
      />
      <Stack.Screen name="PlaceholderScreen" component={PlaceholderScreen} />
    </Stack.Navigator>
  );
};
