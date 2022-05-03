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
import { BundestagTabViewNavigation } from '../Bundestag';
import { DevScreen } from './DevScreen';

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
  DEV: undefined;
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
        }}
        name="WahlOMeter"
        component={PlaceholderScreen}
        // component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Abgeordnete',
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
          drawerIcon: ({ color, size }) => <SvgSettings width={size} height={size} color={color} />,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'FAQ',
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
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          drawerIcon: ({ color, size }) => <SvgAbout width={size} height={size} color={color} />,
        }}
        name={'About'}
        component={AboutScreen}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Rechtliches',
          drawerIcon: ({ color, size }) => <SvgLaw width={size} height={size} color={color} />,
          title: 'Rechtliches',
        }}
        name={'Credentials'}
        component={CredentialsScreen}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Donate',
        }}
        name={'Donate'}
        component={DonateScreen}
      />
      {process.env.NODE_ENV === 'development' && (
        <SidebarDrawer.Screen name="DEV" component={DevScreen} />
      )}
    </SidebarDrawer.Navigator>
  );
};
