/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Image } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #F5FCFF;
`;

const Logo = styled.Image`
  height: 40;
  margin-vertical: 10;
  width: 40;
`;

const InstructionText = styled.Text`
  text-align: center;
  color: #333333;
  margin-bottom: 5;
`;

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu",
  web: "Live Realoading is enabled"
});

const welcomePlatform = () => {
  switch (Platform.OS) {
    case "web":
      return `Welcome to React for Web!`;
    default:
      return `Welcome to React Native!`;
  }
};

export default class App extends Component {
  render() {
    return (
      <Container>
        <Logo source={require("./assets/images/logo.png")} />
        <InstructionText>{welcomePlatform()}</InstructionText>
        <InstructionText>To get started, edit App.js</InstructionText>
        <InstructionText>{instructions}</InstructionText>
      </Container>
    );
  }
}
