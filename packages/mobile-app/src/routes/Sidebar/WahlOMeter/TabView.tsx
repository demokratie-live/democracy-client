import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { WahlOMeterStackParamList } from '.';
import { theme } from '../../../styles';
import Bundestag from '../../../screens/WahlOMeter/Bundestag';
import { WomParty } from '../../../screens/WahlOMeter/Fraktionen';
import { Deputies } from '../../../screens/WahlOMeter/Deputies';

export type TopTabParamList = {
  Bundestag: undefined;
  Fraktionen: undefined;
  Deputies: undefined;
};

const TabNavigation = createMaterialTopTabNavigator<TopTabParamList>();

export type ScreenNavigationProp = StackNavigationProp<
  WahlOMeterStackParamList,
  'TabView'
>;

interface Props {
  noButton?: boolean;
  navigation: ScreenNavigationProp;
}

const TabViewNavigation: React.FC<Props> = () => {
  return (
    <TabNavigation.Navigator
      lazy={true}
      tabBarOptions={{
        scrollEnabled: false,
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        activeTintColor: 'rgb(255,255,255)',
        inactiveTintColor: theme.oldColors.headerTextSecondary,
        style: {
          backgroundColor: '#4494D3',
        },
      }}
      initialRouteName={'Bundestag'}>
      <TabNavigation.Screen name="Bundestag" component={Bundestag} />
      <TabNavigation.Screen name="Fraktionen" component={WomParty} />
      <TabNavigation.Screen
        name="Deputies"
        options={{
          title: 'Abgeordnete',
        }}
        component={Deputies}
      />
    </TabNavigation.Navigator>
  );
};

export default TabViewNavigation;
