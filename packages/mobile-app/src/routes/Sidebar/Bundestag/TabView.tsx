import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import { Bundestag } from '../../../screens/Bundestag';

const TabNavigation = createMaterialTopTabNavigator();

const Tab = ({ route }) => {
  console.log(route.params);
  const { text } = route.params;
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default () => {
  return (
    <TabNavigation.Navigator tabBarOptions={{ scrollEnabled: true }}>
      <TabNavigation.Screen
        name="Abstimmung"
        component={Bundestag}
        initialParams={{ text: 'in Abstimmung Content' }}
      />
      <TabNavigation.Screen
        name="Vergangen"
        component={Bundestag}
        initialParams={{ text: 'Vergangen Content' }}
      />
      <TabNavigation.Screen
        name="Populär"
        component={Tab}
        initialParams={{ text: 'Populär Content' }}
      />
      <TabNavigation.Screen
        name="Vorbereitung"
        component={Tab}
        initialParams={{ text: 'in Vorbereitung Content' }}
      />
    </TabNavigation.Navigator>
  );
};
