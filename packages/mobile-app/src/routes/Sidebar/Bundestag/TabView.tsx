import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DevPlaceholder, List } from '../../../screens/Bundestag';
import { ListType } from '../../../../__generated__/globalTypes';

export type TopTabkParamList = {
  [key: string]: { list: ListType };
};

const TabNavigation = createMaterialTopTabNavigator<TopTabkParamList>();

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{ scrollEnabled: false }}
      initialRouteName={'Sitzungswoche'}>
      <TabNavigation.Screen
        name="Sitzungswoche"
        component={List}
        initialParams={{ list: ListType.CONFERENCEWEEKS_PLANNED }}
      />
      <TabNavigation.Screen
        name="Vergangen"
        component={List}
        initialParams={{ list: ListType.PAST }}
      />
      <TabNavigation.Screen
        name="Top 100"
        component={List}
        initialParams={{ list: ListType.TOP100 }}
      />
      <TabNavigation.Screen
        name="DEV"
        component={DevPlaceholder}
        initialParams={{ list: ListType.PREPARATION }}
      />
    </TabNavigation.Navigator>
  );
};
