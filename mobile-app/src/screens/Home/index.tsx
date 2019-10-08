import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';
import { RootStackParamList } from '../../routes';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen: FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <Container>
      <Text>Home Screen</Text>
      <Button
        title="Go to Introduction"
        onPress={() => navigation.navigate('Introduction')}
      />
      <Button
        title="Go to Verification"
        onPress={() => navigation.navigate('Verification')}
      />
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
    </Container>
  );
};

export default HomeScreen;
