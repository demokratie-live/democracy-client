import React from 'react';
import { DrawerItemList } from '@react-navigation/drawer';
import { ScrollView, Text } from 'react-native';
import styled from 'styled-components/native';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

declare type Props = React.ComponentProps<typeof DrawerItemList>;

export const Sidebar = (props: Props) => (
  <ScrollView>
    <SafeAreaView>
      <Text>Header 🤯</Text>
      <DrawerItemList {...props} />
    </SafeAreaView>
  </ScrollView>
);
