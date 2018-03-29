import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Navigator } from "react-native-navigation";

import onNavigationEvent from "../onNavigationEvent";

const Wrapper = styled.ScrollView`
  flex: 1;
  background-color: #fff;
`;

class Notifications extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#FFFFFF",
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17
  };

  constructor(props) {
    super(props);

    const menuIcon = Platform.OS === "ios" ? "ios-menu" : "md-menu";

    Ionicons.getImageSource(menuIcon, 24, "#FFFFFF").then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: "menu"
          }
        ]
      });
    });

    this.props.navigator.setOnNavigatorEvent(this.onNavigationEvent);
  }

  onNavigationEvent = event => {
    onNavigationEvent({ event, navigator: this.props.navigator });
  };

  render() {
    return (
      <Wrapper>
        <Text>Benachrichtigungen</Text>
      </Wrapper>
    );
  }
}

Notifications.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default Notifications;
