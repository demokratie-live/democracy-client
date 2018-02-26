import React, { Component } from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

const Wrapper = styled.View``;

const Text = styled.Text``;

class Support extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17,
    navBarTextFontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    selectedTopTabTextColor: "#ffffff",
    selectedTopTabIndicatorColor: "#ffffff",
    selectedTopTabIndicatorHeight: 5
  };
  render() {
    return (
      <Wrapper>
        <Text>Support</Text>
      </Wrapper>
    );
  }
}

export default Support;
