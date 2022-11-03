import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AvatarIcon, lightTheme } from '@democracy-deutschland/ui';
import { Sidebar } from './components/Sidebar';
import { Government } from '../../components/Icons';
import SvgWahlOMeter from '../../components/Icons/WahlOMeter';
import SvgSettings from '../../components/Icons/Settings';
import SvgFaqAndSupport from '../../components/Icons/FaqAndSupport';
import SvgAbout from '../../components/Icons/About';
import { AboutScreen } from '../../screens/About';
import { FaqScreen } from '../../screens/Faq';
import { SettingsScreen } from '../../screens/Settings';
import { BundestagTabViewNavigation } from '../Bundestag';
import { DevScreen } from './DevScreen';
import { AbgeordneteScreen } from '../../screens/Abgeordnete';
import { WahlOMeterNavigation } from '../WahlOMeter';

export type SidebarParamList = {
  Bundestag: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Faq: undefined;
  About: undefined;
  Abgeordnete: { editMode: boolean };
  Development: undefined;
  DEV: undefined;
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

export const SidebarNavigation = () => {
  return (
    <SidebarDrawer.Navigator
      initialRouteName="Bundestag"
      useLegacyImplementation
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: lightTheme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: lightTheme.colors.text.secondary,
        drawerType: 'slide',
        overlayColor: 'rgba(0, 0, 0, 0.1)',
        drawerLabelStyle: {
          color: '#fff',
        },
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerActiveBackgroundColor: 'rgba(68, 148, 211, 0.5)',
      }}
    >
      <SidebarDrawer.Screen
        name="Bundestag"
        component={BundestagTabViewNavigation}
        options={{
          drawerLabel: 'hide/Bundestag',
          drawerIcon: ({ color, size }) => <Government width={size} height={size} color={color} />,
          unmountOnBlur: true,
        }}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Wahl-O-Meter',
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
          title: 'Wahl-O-Meter',
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Abgeordnete',
          drawerIcon: ({ color, size }) => <AvatarIcon width={size} height={size} fill={color} />,
          unmountOnBlur: true,
        }}
        name="Abgeordnete"
        component={AbgeordneteScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'Einstellungen',
          drawerLabel: 'Mehr/Einstellungen',
          drawerIcon: ({ color, size }) => <SvgSettings width={size} height={size} color={color} />,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'FAQ & Support',
          drawerLabel: 'Mehr/FAQ & Support',
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={'Faq'}
        component={FaqScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'Über DEMOCRACY',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          drawerIcon: ({ color, size }) => <SvgAbout width={size} height={size} color={color} />,
        }}
        name={'About'}
        component={AboutScreen}
      />
      {process.env.NODE_ENV === 'development' && (
        <SidebarDrawer.Screen name="DEV" component={DevScreen} />
      )}
    </SidebarDrawer.Navigator>
  );
};
