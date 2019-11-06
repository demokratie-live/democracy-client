import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text } from 'react-native';
import { DevPlaceholder, List } from '../../../screens/Bundestag';
import { RouteProp } from '@react-navigation/core';
import { FC } from 'react';

export type TopTabkParamList = {
  [key: string]: { text: string };
};

const TabNavigation = createMaterialTopTabNavigator<TopTabkParamList>();

type ProfileScreenRouteProp = RouteProp<TopTabkParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

const Tab: FC<Props> = ({ route }) => {
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
        component={List}
        initialParams={{ text: 'in Abstimmung Content' }}
      />
      <TabNavigation.Screen
        name="Vergangen"
        component={DevPlaceholder}
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
