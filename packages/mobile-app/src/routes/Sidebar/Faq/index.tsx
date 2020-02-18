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
import { FaqScreen } from '../../../screens/modals/Faq';

export type FaqRootStackParamList = {
  Faq: undefined;
};

const FaqRootStack = createStackNavigator<FaqRootStackParamList>();

type FaqNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Faq'>,
  StackNavigationProp<RootStackParamList>
>;

const MenuButton = styled.TouchableOpacity`
  padding-left: 11;
`;

const FaqRootNavigation = () => {
  const navigation = useNavigation<FaqNavigationProps>();
  return (
    <FaqRootStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background.header,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerBackTitleVisible: false,
        headerTintColor: theme.colors.headerText,
      }}>
      <FaqRootStack.Screen
        name="Faq"
        component={FaqScreen}
        options={{
          title: 'Faq & Support',
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
    </FaqRootStack.Navigator>
  );
};

export default FaqRootNavigation;
