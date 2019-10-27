import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { rootNavigate } from '../../routes/Root';
import { useNavigation } from '@react-navigation/core';
import { BundestagRootStackParamList } from '../../routes/Sidebar/Bundestag';
import { StackNavigationProp } from '@react-navigation/stack';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Bundestag: FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  return (
    <Container>
      <Text>Bundestag Screen</Text>
      <Button
        title="Go to Procedure"
        onPress={() => navigation.navigate('Procedure')}
      />
      <Button title="Voting" onPress={() => navigation.navigate('Voting')} />
      <Button
        title="Go to Introduction"
        onPress={() => rootNavigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => rootNavigate('Verification')}
      />
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
    </Container>
  );
};
