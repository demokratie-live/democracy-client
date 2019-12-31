import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BundestagRootNavigation from './Bundestag';
import { RootStackParamList } from '..';
import GovernmentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Government';
import IncreaseArrowIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/IncreaseArrow';
import InfoArrowIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';
import WaterDrop from '@democracy-deutschland/mobile-ui/src/components/Icons/WaterDrop';

import IntroductionScreen from '../../screens/modals/Introduction';
import { Sidebar } from '../../screens/Sidebar/Sidebar';
import StatisticRootNavigation from './Statistic';
import WahlOMeterNavigation from './WahlOMeter';

export type SidebarParamList = {
  Bundestag: undefined;
  Statistic: undefined;
  WahlOMeter: undefined;
  Introduction: RootStackParamList['Introduction'];
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

export const SidebarNavigation = () => {
  return (
    <SidebarDrawer.Navigator
      initialRouteName="Bundestag"
      unmountInactiveScreens={true}
      drawerContent={props => <Sidebar {...props} />}
      hideStatusBar
      drawerContentOptions={{
        labelStyle: { color: '#fff' },
        activeTintColor: '#fff',
        inactiveTintColor: '#fff',
        activeBackgroundColor: 'rgba(68, 148, 211, 0.5)',
      }}>
      <SidebarDrawer.Screen
        name="Bundestag"
        component={BundestagRootNavigation}
        options={{
          drawerLabel: '/Bundestag',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <GovernmentIcon width={size} height={size} color={color} />
          ),
        }}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Auswertungen/Wahl-O-Meter',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <WaterDrop width={size} height={size} color={color} />
          ),
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Auswertungen/Statistik',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <IncreaseArrowIcon width={size} height={size} color={color} />
          ),
        }}
        name="Statistic"
        component={StatisticRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Anleitung',
          gestureEnabled: false,
          drawerIcon: ({ color, size }) => (
            <InfoArrowIcon width={size} height={size} color={color} />
          ),
        }}
        name={'Introduction'}
        initialParams={{}}
        component={IntroductionScreen}
      />
    </SidebarDrawer.Navigator>
  );
};
