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
import { AboutScreen } from '../../../screens/modals/About';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type AboutRootStackParamList = {
  About: undefined;
};

const AboutRootStack = createStackNavigator<AboutRootStackParamList>();

type AboutNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'About'>,
  StackNavigationProp<RootStackParamList>
>;

const AboutRootNavigation = () => {
  const navigation = useNavigation<AboutNavigationProps>();
  return (
    <AboutRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <AboutRootStack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Über DEMOCRACY',
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
    </AboutRootStack.Navigator>
  );
};

export default AboutRootNavigation;
