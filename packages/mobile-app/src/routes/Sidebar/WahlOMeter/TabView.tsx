import React, { useContext } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { WahlOMeterStackParamList } from '.';
import { theme } from '../../../styles';
import Bundestag from '../../../screens/WahlOMeter/Bundestag';
import { WomParty } from '../../../screens/WahlOMeter/Fraktionen';
import { Deputies } from '../../../screens/WahlOMeter/Deputies';
import { ParlamentContext } from '../../../context/Parlament';

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
  const { parlament } = useContext(ParlamentContext);
  const wom = parlament.screens.wom ? parlament.screens.wom : undefined;

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
      {wom?.institution ? (
        <TabNavigation.Screen name="Bundestag" component={Bundestag} />
      ) : null}
      {wom?.fractions ? (
        <TabNavigation.Screen name="Fraktionen" component={WomParty} />
      ) : null}
      {wom?.deputies ? (
        <TabNavigation.Screen
          name="Deputies"
          options={{
            title: 'Abgeordnete',
          }}
          component={Deputies}
        />
      ) : null}
    </TabNavigation.Navigator>
  );
};

export default TabViewNavigation;
