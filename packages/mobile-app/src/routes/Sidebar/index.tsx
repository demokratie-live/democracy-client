import React, { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { Button, SafeAreaView } from 'react-native';
import BundestagRootNavigation from './Bundestag';
import IntroductionScreen from '../../screens/modals/Introduction';
import { Sidebar } from '../../screens/Sidebar/Sidebar';
import { RootStackParamList } from '..';
import GovernmentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Government';
import IncreaseArrowIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/IncreaseArrow';
import InfoArrowIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Info';

export type SidebarParamList = {
  Bundestag: undefined;
  Statistic: undefined;
  Introduction: RootStackParamList['Introduction'];
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

interface MyStatisticScreenProps {
  navigation: DrawerNavigationProp<SidebarParamList>;
}

const MyStatisticScreen: FC<MyStatisticScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
};

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
          drawerLabel: 'Listen/Bundestag',
          gestureEnabled: true,
          drawerIcon: ({ color, size }) => (
            <GovernmentIcon width={size} height={size} color={color} />
          ),
        }}
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
        component={MyStatisticScreen}
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
