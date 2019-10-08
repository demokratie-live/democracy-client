import React from 'react';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
  DrawerNavigationItemsProps,
} from '@react-navigation/drawer';
import { NavigationNativeContainer } from '@react-navigation/native';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import HomeScreen from '../Home';

const Drawer = createDrawerNavigator();

function MyNotificationsScreen({ navigation }) {
  return (
    <SafeAreaView>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </SafeAreaView>
  );
}

const CustomDrawerContentComponent = (props: DrawerNavigationItemsProps) => (
  <ScrollView>
    <SafeAreaView style={styles.container}>
      <Text>Header</Text>
      <DrawerNavigatorItems {...props} />
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
    <NavigationNativeContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        contentComponent={CustomDrawerContentComponent}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={MyNotificationsScreen} />
      </Drawer.Navigator>
    </NavigationNativeContainer>
  );
};
