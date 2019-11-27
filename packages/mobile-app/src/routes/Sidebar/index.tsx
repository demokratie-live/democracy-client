import React, { FC } from 'react';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Button, SafeAreaView } from 'react-native';
import BundestagRootNavigation from './Bundestag';
import IntroductionScreen from '../../screens/modals/Introduction';
import { sidebarNavigationRef } from './NavigationService';
import { Sidebar } from '../../screens/Sidebar';
import { RootStackParamList } from '..';

export * from './NavigationService';

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
    <NavigationNativeContainer ref={sidebarNavigationRef} independent>
      <SidebarDrawer.Navigator
        initialRouteName="Bundestag"
        drawerContent={Sidebar}>
        <SidebarDrawer.Screen
          name="Bundestag"
          component={BundestagRootNavigation}
        />
        <SidebarDrawer.Screen
          options={{}}
          name="Statistic"
          component={MyStatisticScreen}
        />
        <SidebarDrawer.Screen
          options={{}}
          name={'Introduction'}
          initialParams={{}}
          component={IntroductionScreen}
        />
      </SidebarDrawer.Navigator>
    </NavigationNativeContainer>
  );
};
