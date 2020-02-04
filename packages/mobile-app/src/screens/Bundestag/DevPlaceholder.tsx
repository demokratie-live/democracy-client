import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import AsyncStorage from '@react-native-community/async-storage';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useContext, useEffect, useState } from 'react';
import { Alert, Button, Clipboard, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { InitialStateContext } from '../../context/InitialStates';
import VotesLocal from '../../lib/VotesLocal';
import { SidebarParamList } from '../../routes/Sidebar';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { TopTabParamList } from '../../routes/Sidebar/Bundestag/TabView';
import { RootStackParamList } from '../../routes';

const Container = styled.ScrollView`
  flex: 1;
  /* align-items: center; */
  /* justify-content: center; */
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

interface State {
  notifications: any[];
  openedNotifications: any[];
  pushToken?: string | null;
  hasPermissions: boolean;
}

const LocalVotes = () => {
  const [localVotes, setLocalVotes] = useState('');
  useEffect(() => {
    VotesLocal.readKeychain().then(data => setLocalVotes(JSON.stringify(data)));
  }, []);

  return (
    <>
      <Text>LocalVotes: {localVotes}</Text>
      <Button
        title="Copy Local Votes"
        onPress={() => {
          Clipboard.setString(localVotes);
          Alert.alert('local votes copied');
        }}
      />
    </>
  );
};

export const DevPlaceholder: FC = () => {
  const { isVerified } = useContext(InitialStateContext);
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  return (
    <Container>
      <Text>{DeviceInfo.getBundleId()}</Text>
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
      <LocalVotes />
    </Container>
  );
};
