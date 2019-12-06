import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { rootNavigate } from '../../routes/Root';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { TopTabkParamList } from '../../routes/Sidebar/Bundestag/TabView';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabkParamList, 'DEV'>,
  CompositeNavigationProp<
    StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
    CompositeNavigationProp<
      DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
      StackNavigationProp<RootStackParamList>
    >
  >
>;

export const DevPlaceholder: FC = () => {
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  return (
    <Container>
      <Text>Bundestag Screen</Text>
      <Button
        title="Go to Procedure"
        onPress={() =>
          navigation.navigate('Procedure', {
            procedureId: '1',
            title: 'Sitzungswoche',
          })
        }
      />
      <Button title="Voting" onPress={() => navigation.navigate('Voting')} />
      <Button
        title="Go to Introduction"
        onPress={() => rootNavigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => navigation.navigate('Verification')}
      />
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Document width="32px" height="32px" color="black" />
    </Container>
  );
};
