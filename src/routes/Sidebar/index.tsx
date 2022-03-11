import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AvatarIcon, lightTheme } from '@democracy-deutschland/ui';
import { Sidebar } from './components/Sidebar';
import { Government } from '../../components/Icons';
import SvgWahlOMeter from '../../components/Icons/WahlOMeter';
import SvgSettings from '../../components/Icons/Settings';
import SvgFaqAndSupport from '../../components/Icons/FaqAndSupport';
import SvgAbout from '../../components/Icons/About';
import SvgLaw from '../../components/Icons/Law';
import { PlaceholderScreen } from '../../screens/Placeholder';
import { CredentialsScreen } from '../../screens/Credentials';
import { AboutScreen } from '../../screens/About';
import { FaqScreen } from '../../screens/Faq';
import { SettingsScreen } from '../../screens/Settings';
import { DonateScreen } from '../../screens/Donate';

export type SidebarParamList = {
  Bundestag: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Faq: undefined;
  About: undefined;
  Credentials: undefined;
  Donate: undefined;
  Abgeordnete: undefined;
  Development: undefined;
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

export const SidebarNavigation = () => {
  return (
    <SidebarDrawer.Navigator
      initialRouteName="Bundestag"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: lightTheme.colors.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: lightTheme.colors.text.secondary,
        drawerType: 'back',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
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
        component={PlaceholderScreen}
        // component={BundestagRootNavigation}
        options={{
          drawerLabel: 'hide/Bundestag',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <Government width={size} height={size} color={color} />,
          unmountOnBlur: true,
        }}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Wahl-O-Meter',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
        name="WahlOMeter"
        component={PlaceholderScreen}
        // component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Abgeordnete',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <AvatarIcon width={size} height={size} fill={color} />,
          unmountOnBlur: true,
        }}
        name="Abgeordnete"
        component={PlaceholderScreen}
        // component={AbgeordneteRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Settings',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <SvgSettings width={size} height={size} color={color} />,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'FAQ',
          drawerLabel: 'Mehr/FAQ & Support',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgFaqAndSupport width={size} height={size} color={color} />
          ),
        }}
        name={'Faq'}
        component={FaqScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <SvgAbout width={size} height={size} color={color} />,
        }}
        name={'About'}
        component={AboutScreen}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Rechtliches',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <SvgLaw width={size} height={size} color={color} />,
          title: 'Rechtliches',
        }}
        name={'Credentials'}
        component={CredentialsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Donate',
          gestureEnabled: true,
        }}
        name={'Donate'}
        component={DonateScreen}
      />
    </SidebarDrawer.Navigator>
  );
};
