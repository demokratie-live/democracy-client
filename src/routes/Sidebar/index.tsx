import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { AvatarIcon } from '@democracy-deutschland/ui';
import { Sidebar } from './components/Sidebar';
import { Government } from '../../components/Icons';
import SvgWahlOMeter from '../../components/Icons/WahlOMeter';
import SvgSettings from '../../components/Icons/Settings';
import SvgFaqAndSupport from '../../components/Icons/FaqAndSupport';
import SvgAbout from '../../components/Icons/About';
import SvgLaw from '../../components/Icons/Law';
import { PlaceholderScreen } from '../../screens/Placeholder';

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
        component={PlaceholderScreen}
        // component={SettingsRootNavigation}
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
        component={PlaceholderScreen}
        // component={FaqRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <SvgAbout width={size} height={size} color={color} />,
        }}
        name={'About'}
        component={PlaceholderScreen}
        // component={AboutRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Rechtliches',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => <SvgLaw width={size} height={size} color={color} />,
        }}
        name={'Credentials'}
        component={PlaceholderScreen}
        // component={CredentialsRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Donate',
          gestureEnabled: true,
        }}
        name={'Donate'}
        component={PlaceholderScreen}
        // component={DonateRootNavigation}
      />
    </SidebarDrawer.Navigator>
  );
};
