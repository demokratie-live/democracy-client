import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Filter, Search, Procedure, Voting } from '../../../screens/Bundestag';
import { Button } from 'react-native';
import { sidebarToggle } from '../NavigationService';
import TabView from './TabView';

export type BundestagRootStackParamList = {
  Bundestag: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: undefined;
  Filter: undefined;
  Search: undefined;
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

const BundestagRootNavigation = () => {
  return (
    <NavigationNativeContainer independent>
      <BundestagRootStack.Navigator>
        <BundestagRootStack.Screen
          name="Bundestag"
          component={TabView}
          options={{
            headerLeft: () => <Button onPress={sidebarToggle} title="🍔" />,
          }}
        />
        <BundestagRootStack.Screen
          name="Procedure"
          component={Procedure}
          options={({ route }) => ({ title: route.params.title })}
        />
        <BundestagRootStack.Screen
          name="Voting"
          component={Voting}
          options={
            {
              // gestureDirection: 'vertical',
            }
          }
        />
        <BundestagRootStack.Screen name="Filter" component={Filter} />
        <BundestagRootStack.Screen name="Search" component={Search} />
      </BundestagRootStack.Navigator>
    </NavigationNativeContainer>
  );
};

export default BundestagRootNavigation;
