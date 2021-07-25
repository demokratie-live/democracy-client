import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  CompositeNavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '..';
import { RootStackParamList } from '../..';
import MenuIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Menu';
import { Abgeordnete } from '../../../screens/Abgeordnete';
import { theme } from '../../../styles';
import { BurgerMenuButton } from '../../../components/MenuButton';
import { DeputyProfil } from '../../../screens/DeputyProfile';

export type AbgeordneteRootStackParamList = {
  Abgeordnete: { editMode: boolean };
  DeputyProfile: { id: string };
};

const AbgeordneteRootStack = createStackNavigator<
  AbgeordneteRootStackParamList
>();

export type AbgeordneteNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Abgeordnete'>,
  StackNavigationProp<RootStackParamList>
>;

const AbgeordneteRootNavigation = () => {
  const navigation = useNavigation<AbgeordneteNavigationProps>();
  const route = useRoute<RouteProp<any, ''>>();

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
          headerLeft: () =>
            !route?.params?.editMode ? (
              <BurgerMenuButton
                onPress={navigation.toggleDrawer}
                testID="BurgerMenuButton">
                <MenuIcon width={18} height={18} color="#fff" />
              </BurgerMenuButton>
            ) : null,
        }}
        initialParams={{
          editMode: route?.params?.editMode,
        }}
      />
      <AbgeordneteRootStack.Screen
        name="DeputyProfile"
        component={DeputyProfil}
        options={{
          title: '',
        }}
      />
    </AbgeordneteRootStack.Navigator>
  );
};

export default AbgeordneteRootNavigation;
