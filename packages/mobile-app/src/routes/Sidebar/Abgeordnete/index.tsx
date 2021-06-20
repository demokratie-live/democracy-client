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
import { Abgeordnete } from '../../../screens/Abgeordnete';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type AbgeordneteRootStackParamList = {
  Abgeordnete: undefined;
};

const AbgeordneteRootStack = createStackNavigator<
  AbgeordneteRootStackParamList
>();

type AbgeordneteNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Abgeordnete'>,
  StackNavigationProp<RootStackParamList>
>;

const AbgeordneteRootNavigation = () => {
  const navigation = useNavigation<AbgeordneteNavigationProps>();
  return (
    <AbgeordneteRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.oldColors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.oldColors.headerText,
      }}>
      <AbgeordneteRootStack.Screen
        name="Abgeordnete"
        component={Abgeordnete}
        options={{
          title: 'Abgeordnete',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <BurgerMenuButton
              onPress={navigation.toggleDrawer}
              testID="BurgerMenuButton">
              <MenuIcon width={18} height={18} color="#fff" />
            </BurgerMenuButton>
          ),
        }}
      />
    </AbgeordneteRootStack.Navigator>
  );
};

export default AbgeordneteRootNavigation;
