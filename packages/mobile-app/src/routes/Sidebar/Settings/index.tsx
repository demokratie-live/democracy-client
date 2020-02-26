import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import { Settings } from '../../../screens/Settings';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type SettingsRootStackParamList = {
  Settings: undefined;
};

const SettingsRootStack = createStackNavigator<SettingsRootStackParamList>();

type SettingsNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Settings'>,
  StackNavigationProp<RootStackParamList>
>;

const SettingsRootNavigation = () => {
  const navigation = useNavigation<SettingsNavigationProps>();
  return (
    <SettingsRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <SettingsRootStack.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton onPress={navigation.toggleDrawer}>
              <MenuIcon width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
    </SettingsRootStack.Navigator>
  );
};

export default SettingsRootNavigation;
