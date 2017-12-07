/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import styled from 'styled-components/native';

import List from './screens/List';

const Container = styled.View`
  flex: 1;
  background-color: #f5fcff;
`;

export default () => (
  <Container>
    <List />
  </Container>
);
