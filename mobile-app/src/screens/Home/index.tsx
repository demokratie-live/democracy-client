import React, { FC } from 'react';
import { useNavigation } from '@react-navigation/core';
import styled from 'styled-components/native';
import { Text, Button } from 'react-native';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </Container>
  );
};

export default HomeScreen;
