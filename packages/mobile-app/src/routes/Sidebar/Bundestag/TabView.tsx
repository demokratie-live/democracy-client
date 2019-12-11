import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { DevPlaceholder, List } from '../../../screens/Bundestag';
import { ListType } from '../../../../__generated__/globalTypes';

export type TopTabParamList = {
  Sitzungswoche: { list: ListType };
  Vergangen: { list: ListType };
  'Top 100': { list: ListType };
  DEV: { list: ListType };
};

const TabNavigation = createMaterialTopTabNavigator<TopTabParamList>();

export default () => {
  return (
    <TabNavigation.Navigator
      tabBarOptions={{
        scrollEnabled: false,
        indicatorStyle: {
          backgroundColor: '#fff',
        },
        style: {
          backgroundColor: '#4494D3',
        },
      }}
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
      {__DEV__ && (
        <TabNavigation.Screen
          name="DEV"
          component={DevPlaceholder}
          initialParams={{ list: ListType.PREPARATION }}
        />
      )}
    </TabNavigation.Navigator>
  );
};
