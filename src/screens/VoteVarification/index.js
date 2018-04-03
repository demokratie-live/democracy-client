import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import DeviceInfo from "react-native-device-info";

import onNavigationEvent from "./onNavigationEvent";

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  padding-vertical: 30;
  padding-horizontal: 48;
`;

const Logo = styled.Image.attrs({
  source: require("../../assets/images/logo-text10X.png")
})``;

const Text = styled.Text`
  font-size: 18;
  padding-left: 12;
  padding-bottom: 5;
`;

const SecurityList = styled.View`
  padding-vertical: 44;
`;

const EntryWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 16;
`;

const CheckIcon = styled(SimpleLineIcons).attrs({
  size: 31,
  color: "#000000"
})``;

const ProcessImageWrapper = styled.View`
  flex-direction: row;
`;

const ProcessImage = styled.Image``;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-vertical: 28;
`;

class VoteVerification extends Component {
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
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split(".")
      .slice(0, 3)
      .join(".")}`;
    return <ScrollWrapper />;
  }
}

VoteVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default VoteVerification;
