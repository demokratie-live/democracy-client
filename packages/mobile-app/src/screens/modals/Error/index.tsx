import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-color: rgba(255, 200, 200, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ErrorScreen = () => (
  <Wrapper>
    <Text>ERROR!!!</Text>
  </Wrapper>
);
