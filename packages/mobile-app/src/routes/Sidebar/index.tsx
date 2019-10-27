import React from 'react';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import BundestagRootNavigation from './Bundestag';
import InstructionScreen from '../../screens/modals/Introduction';
import { sidebarNavigationRef } from './NavigationService';

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

const CustomDrawerContentComponent = (props: any) => (
  <ScrollView>
    <SafeAreaView style={styles.container}>
      <Text>Header</Text>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const Sidebar = () => {
  return (
    <NavigationNativeContainer ref={sidebarNavigationRef}>
      <SidebarDrawer.Navigator
        initialRouteName="Bundestag"
        contentComponent={CustomDrawerContentComponent}>
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
