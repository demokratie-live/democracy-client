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
import { FaqScreen } from '../../../screens/modals/Faq';
import { BurgerMenuButton } from '../../../components/MenuButton';

export type FaqRootStackParamList = {
  Faq: undefined;
};

const FaqRootStack = createStackNavigator<FaqRootStackParamList>();

type FaqNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Faq'>,
  StackNavigationProp<RootStackParamList>
>;

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
          title: 'FAQ & Support',
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
    </FaqRootStack.Navigator>
  );
};

export default FaqRootNavigation;
