// https://github.com/react-navigation/navigation-ex/blob/9d9fe31f0221242763fe22dafd7bc2cf014c592e/packages/drawer/src/views/DrawerItemList.tsx

import * as React from 'react';
import { CommonActions } from '@react-navigation/core';
import {
  DrawerActions,
  DrawerNavigationState,
} from '@react-navigation/routers';
import { DrawerContentOptions, DrawerItem } from '@react-navigation/drawer';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/drawer/src/types';
import { Text, View } from 'react-native';

type Props = Omit<DrawerContentOptions, 'contentContainerStyle' | 'style'> & {
  state: DrawerNavigationState;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

/**
 * Component that renders the navigation list in the drawer.
 */
export default function DrawerItemList({
  state,
  navigation,
  descriptors,
  activeTintColor,
  inactiveTintColor,
  activeBackgroundColor,
  inactiveBackgroundColor,
  itemStyle,
  labelStyle,
}: Props) {
  let preCategory = '';
  return (state.routes.map((route, i) => {
    const focused = i === state.index;
    const { title, drawerLabel, drawerIcon } = descriptors[route.key].options;
    const [curCategory, label] = (drawerLabel as string).split('/');
    const showCategoryLabel = curCategory !== preCategory;
    preCategory = curCategory;

    return (
      <View key={route.key}>
        {showCategoryLabel && <Text style={labelStyle}>{curCategory}</Text>}
        <DrawerItem
          label={
            label !== undefined
              ? label
              : title !== undefined
              ? title
              : route.name
          }
          icon={drawerIcon}
          focused={focused}
          activeTintColor={activeTintColor}
          inactiveTintColor={inactiveTintColor}
          activeBackgroundColor={activeBackgroundColor}
          inactiveBackgroundColor={inactiveBackgroundColor}
          labelStyle={labelStyle}
          style={itemStyle}
          onPress={() => {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate(route.name)),
              target: state.key,
            });
          }}
        />
      </View>
    );
  }) as React.ReactNode) as React.ReactElement;
}
