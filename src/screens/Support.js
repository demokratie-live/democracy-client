import React, { Component } from "react";
import styled from "styled-components/native";
import { Platform } from "react-native";

import onNavigationEvent from "./onNavigationEvent";

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

  constructor(props) {
    super(props);
    this.props.navigator.setStyle({
      navBarCustomView: "democracy.VoteList.Header",
      navBarComponentAlignment: "fill",
      navBarCustomViewInitialProps: {
        title: "Bundestag",
        navigator: this.props.navigator
      }
    });
    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  onNavigationEvent = event => {
    onNavigationEvent({ event, navigator: this.props.navigator });
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
