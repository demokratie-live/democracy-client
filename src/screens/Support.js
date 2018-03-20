import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform, Linking } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import DeviceInfo from "react-native-device-info";

import Config from "../config";

import onNavigationEvent from "./onNavigationEvent";

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-vertical: 30;
  padding-horizontal: 48;
  align-items: center;
`;

const Logo = styled.Image.attrs({
  source: require("../../assets/images/logo-text10X.png")
})``;

const Text = styled.Text`
  text-align: center;
  font-size: 15;
  color: #8f8e94;
  padding-vertical: 28;
`;

const ContactWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const ContactIcons = styled(FontAwesome).attrs({
  size: 40,
  color: "#000000"
})``;

class Support extends Component {
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

  linking = url => () => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url).catch(() => null);
      }
    });
  };

  render() {
    const phoneNumber = `telprompt:${Config.PHONE_NUMBER}`;
    const email = `mailto:${Config.CONTACT_EMAIL}`;
    const github = Config.GITHUB_URL;
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split(".")
      .slice(0, 3)
      .join(".")}`;
    return (
      <ScrollWrapper>
        <Wrapper>
          <Logo />
          <Text>
            {`ist eine Initiative für mehr Basisdemokratie in Deutschland.


Indem wir die modernen und weitverbreiteten digitalen Medien nutzen, um kontinuierlich bundesweite Bürgerabstimmungen zu organisieren, überwindet politische Biteiligung die klassischen Grenzen von Ort und Zeit.

DEMOCRACY ist öffentliche Infrastruktur, die das Funktionieren einer lebendigen Demokratie begünstigen soll.`}
          </Text>
          <ContactWrapper>
            <IconWrapper onPress={this.linking(phoneNumber)}>
              <ContactIcons name="phone" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(email)}>
              <ContactIcons name="envelope" size={30} />
            </IconWrapper>
            <IconWrapper onPress={this.linking(github)}>
              <ContactIcons name="github" />
            </IconWrapper>
          </ContactWrapper>
          <Text style={{ paddingTop: 36 }}>{version}</Text>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default Support;
