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
import styled from 'styled-components/native';
import { theme } from '../../../styles';
import { DonateScreen } from '../../../screens/Sidebar/Donate';

export type DonateRootStackParamList = {
  Donate: undefined;
};

const DonateRootStack = createStackNavigator<DonateRootStackParamList>();

type DonateNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Donate'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const DonateRootNavigation = () => {
  const navigation = useNavigation<DonateNavigationProps>();
  return (
    <DonateRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <DonateRootStack.Screen
        name="Donate"
        component={DonateScreen}
        options={{
          title: 'Unterstütze DEMOCRACY',
          headerTintColor: '#fff',
          headerStyle: {
            backgroundColor: '#4494D3',
            elevation: 0,
            shadowOpacity: 0,
          },
          headerLeft: () => (
            <MenuButton onPress={navigation.toggleDrawer}>
              <MenuIcon width={18} height={18} color="#fff" />
            </MenuButton>
          ),
        }}
      />
    </DonateRootStack.Navigator>
  );
};

export default DonateRootNavigation;
