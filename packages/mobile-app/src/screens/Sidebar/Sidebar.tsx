import React from 'react';
import { DrawerContentOptions, DrawerItemList } from '@react-navigation/drawer';
import { DrawerNavigationState } from '@react-navigation/routers';
import {
  DrawerNavigationHelpers,
  DrawerDescriptorMap,
} from '@react-navigation/drawer/lib/typescript/drawer/src/types';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

// TODO import this from library
// should be fixed by https://github.com/react-navigation/navigation-ex/issues/143
declare type Props = Omit<
  DrawerContentOptions,
  'contentContainerStyle' | 'style'
> & {
  state: DrawerNavigationState;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

export const Sidebar = (props: Props) => (
  <ScrollView>
    <SafeAreaView>
      <Text>Header 🤯</Text>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);
