import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PlaceholderScreen} from '../screens/Placeholder';

export type RootStackParamList = {
  Home: {title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" initialParams={{title: 'Home'}}>
        {props => <PlaceholderScreen {...props} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
