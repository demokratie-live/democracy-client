import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Filter, Bundestag, Search } from '../../../screens/Bundestag';

export type BundestagRootStackParamList = {
  Bundestag: undefined;
  Filter: undefined;
  Search: undefined;
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

const BundestagRootNavigation = () => {
  return (
    <NavigationNativeContainer>
      <BundestagRootStack.Navigator mode="modal">
        <BundestagRootStack.Screen name="Bundestag" component={Bundestag} />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen name="Search" component={Search} />
      </BundestagRootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default BundestagRootNavigation;
