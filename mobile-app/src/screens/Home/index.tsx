import React, { FC } from 'react';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { rootNavigate } from '../../routes/Root';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen: FC = () => {
  return (
    <Container>
      <Text>Home Screen</Text>
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

export default HomeScreen;
