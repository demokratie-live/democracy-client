import React, { FC, useContext } from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { StackNavigationProp } from '@react-navigation/stack';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { TopTabParamList } from '../../routes/Sidebar/Bundestag/TabView';
import { InitialStateContext } from '../../context/InitialStates';
import VotesLocal from '../../lib/VotesLocal';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabParamList, 'DEV'>,
  CompositeNavigationProp<
    StackNavigationProp<BundestagRootStackParamList, 'TabView'>,
    CompositeNavigationProp<
      DrawerNavigationProp<SidebarParamList, 'Bundestag'>,
      StackNavigationProp<RootStackParamList>
    >
  >
>;

export const DevPlaceholder: FC = () => {
  const { isVerified } = useContext(InitialStateContext);
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
        onPress={() => navigation.navigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => navigation.navigate('Verification')}
      />
      {__DEV__ && <Text>is verified {JSON.stringify(isVerified)}</Text>}
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Button
        title="Clear Local Votes Storage"
        onPress={() => VotesLocal.reset()}
      />
      <Document width="32px" height="32px" color="black" />
    </Container>
  );
};
