import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';
import { Button, SafeAreaView } from 'react-native';
import BundestagRootNavigation from './Bundestag';
import InstructionScreen from '../../screens/modals/Introduction';
import { sidebarNavigationRef } from './NavigationService';
import { Sidebar } from '../../screens/Sidebar';

export * from './NavigationService';

export type SidebarParamList = {
  Bundestag: undefined;
  Statistic: undefined;
  Instruction: undefined;
};

const SidebarDrawer = createDrawerNavigator<SidebarParamList>();

function MyStatisticScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
}

export const SidebarNavigation = () => {
  return (
    <NavigationNativeContainer ref={sidebarNavigationRef}>
      <SidebarDrawer.Navigator
        initialRouteName="Bundestag"
        contentComponent={Sidebar}>
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
          name="Instruction"
          component={InstructionScreen}
        />
      </SidebarDrawer.Navigator>
    </NavigationNativeContainer>
  );
};
