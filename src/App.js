/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const logo = require('./assets/images/democracy-logo.png');

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const Logo = styled.Image`
  height: 196;
  margin-vertical: 10;
  width: 196;
`;

const InstructionText = styled.Text`
  text-align: center;
  color: #333333;
  margin-bottom: 5;
`;

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
  web: 'Live Realoading is enabled',
});

const welcomePlatform = () => {
  switch (Platform.OS) {
    case 'web':
      return 'Welcome to React for Web!';
    default:
      return 'Welcome to React Native!';
  }
};

export default () => (
  <Container>
    <Logo source={logo} />
    <InstructionText>{welcomePlatform()}</InstructionText>
    <InstructionText>To get started, edit App.js</InstructionText>
    <InstructionText>{instructions}</InstructionText>
  </Container>
);
