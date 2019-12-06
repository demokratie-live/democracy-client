import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { Filter, Search, Procedure, Voting } from '../../../screens/Bundestag';
import { Button } from 'react-native';
import TabView from './TabView';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';

export type BundestagRootStackParamList = {
  TabView: undefined;
  Procedure: { procedureId: string; title: string };
  Voting: undefined;
  Filter: undefined;
  Search: undefined;
};

const BundestagRootStack = createStackNavigator<BundestagRootStackParamList>();

type BundestagNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
  StackNavigationProp<RootStackParamList>
>;

const BundestagRootNavigation = () => {
  const navigation = useNavigation<BundestagNavigationProps>();
  return (
    <BundestagRootStack.Navigator>
      <BundestagRootStack.Screen
        name="TabView"
        component={TabView}
        options={{
          headerLeft: () => (
            <Button onPress={navigation.toggleDrawer} title="🍔" />
          ),
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
  );
};

export default BundestagRootNavigation;
