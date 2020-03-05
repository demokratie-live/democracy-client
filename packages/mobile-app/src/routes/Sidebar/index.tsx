import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BundestagRootNavigation from './Bundestag';
import GovernmentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Government';
import SvgSettings from '@democracy-deutschland/mobile-ui/src/components/Icons/Settings';
import SvgWahlOMeter from '@democracy-deutschland/mobile-ui/src/components/Icons/WahlOMeter';
import SvgFaqAndSupport from '@democracy-deutschland/mobile-ui/src/components/Icons/FaqAndSupport';
import SvgAbout from '@democracy-deutschland/mobile-ui/src/components/Icons/About';
import SvgLaw from '@democracy-deutschland/mobile-ui/src/components/Icons/Law';

import { Sidebar } from '../../screens/Sidebar/Sidebar';
import WahlOMeterNavigation from './WahlOMeter';
import SettingsRootNavigation from './Settings';
import FaqRootNavigation from './Faq';
import AboutRootNavigation from './About';
import CredentialsRootNavigation from './Credentials';
import DonateRootNavigation from './Donate';

export type SidebarParamList = {
  Bundestag: undefined;
  WahlOMeter: undefined;
  Settings: undefined;
  Faq: undefined;
  About: undefined;
  Credentials: undefined;
  Donate: undefined;
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

export const SidebarNavigation = () => {
  console.log('HIER ´3');
  return (
    <SidebarDrawer.Navigator
      initialRouteName="Bundestag"
      drawerContent={props => <Sidebar {...props} />}
      drawerType={'back'}
      overlayColor="1"
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
          unmountOnBlur: true,
        }}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Auswertungen/Wahl-O-Meter',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgWahlOMeter width={size} height={size} color={color} />
          ),
          unmountOnBlur: true,
        }}
        name="WahlOMeter"
        component={WahlOMeterNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Settings',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgSettings width={size} height={size} color={color} />
          ),
        }}
        name="Settings"
        component={SettingsRootNavigation}
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
        component={FaqRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          title: 'About',
          drawerLabel: 'Mehr/Über DEMOCRACY',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgAbout width={size} height={size} color={color} />
          ),
        }}
        name={'About'}
        component={AboutRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'Mehr/Rechtliches',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <SvgLaw width={size} height={size} color={color} />
          ),
        }}
        name={'Credentials'}
        component={CredentialsRootNavigation}
      />
      <SidebarDrawer.Screen
        options={{
          drawerLabel: 'hide/Donate',
          gestureEnabled: true,
        }}
        name={'Donate'}
        component={DonateRootNavigation}
      />
    </SidebarDrawer.Navigator>
  );
};
