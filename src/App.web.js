/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import styled from 'styled-components/native';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import IoniconsFont from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

import List from './screens/List';
import ListDetails from './screens/ListDetails';

const iconFontStyles = `
@font-face {
  src: url(${MaterialIconsFont});
  font-family: Material Icons;
}
@font-face {
  src: url(${IoniconsFont});
  font-family: Ionicons;
}
`;

const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  // $FlowFixMe
  style.styleSheet.cssText = iconFontStyles;
} else {
  // $FlowFixMe
  style.appendChild(document.createTextNode(iconFontStyles));
}
// $FlowFixMe
document.head.appendChild(style);

const Container = styled.View`
  flex: 1;
  background-color: #f5fcff;
`;

export default () => (
  <Router>
    <Container>
      <Route exact path="/" component={List} />
      <Route exact path="/details/:id" component={ListDetails} />
    </Container>
  </Router>
);
