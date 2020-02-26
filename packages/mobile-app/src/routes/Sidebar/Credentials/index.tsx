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
import { theme } from '../../../styles';
import { CredentialsScreen } from '../../../screens/modals/Credentials';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type CredentialsRootStackParamList = {
  Credentials: undefined;
};

const CredentialsRootStack = createStackNavigator<
  CredentialsRootStackParamList
>();

type CredentialsNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Credentials'>,
  StackNavigationProp<RootStackParamList>
>;

const CredentialsRootNavigation = () => {
  const navigation = useNavigation<CredentialsNavigationProps>();
  return (
    <CredentialsRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <CredentialsRootStack.Screen
        name="Credentials"
        component={CredentialsScreen}
        options={{
          title: 'Rechtliches',
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
    </CredentialsRootStack.Navigator>
  );
};

export default CredentialsRootNavigation;
