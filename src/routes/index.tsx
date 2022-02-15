import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PlaceholderScreen } from '../screens/Placeholder';
import Introduction from '../screens/Introduction';

export type RootStackParamList = {
  Home: { title: string };
  Introduction: { done?: string; lastStartWithVersion?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Introduction"
        initialParams={{ lastStartWithVersion: '', done: 'SET_LAST_START_VERSION' }}
        component={Introduction}
      />
      <Stack.Screen name="Home" initialParams={{ title: 'Home' }} component={PlaceholderScreen} />
    </Stack.Navigator>
  );
};
