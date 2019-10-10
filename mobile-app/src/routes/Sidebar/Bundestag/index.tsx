import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationNativeContainer } from '@react-navigation/native';
import {
  Filter,
  Bundestag,
  Search,
  Procedure,
  Voting,
} from '../../../screens/Bundestag';
import { Button } from 'react-native';

export type BundestagRootStackParamList = {
  Bundestag: undefined;
  Procedure: undefined;
  Voting: undefined;
  Filter: undefined;
  Search: undefined;
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

const BundestagRootNavigation = () => {
  return (
    <NavigationNativeContainer>
      <BundestagRootStack.Navigator>
        <BundestagRootStack.Screen
          name="Bundestag"
          component={Bundestag}
          options={{
            headerLeft: () => <Button onPress={() => {}} title="123" />,
          }}
        />
        <BundestagRootStack.Screen name="Procedure" component={Procedure} />
        <BundestagRootStack.Screen
          name="Voting"
          component={Voting}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen name="Search" component={Search} />
      </BundestagRootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default BundestagRootNavigation;
