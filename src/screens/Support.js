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
  padding-top: 30;
  padding-horizontal: 18;
  align-items: center;
`;

const Logo = styled.Image.attrs({
  source: require("../../assets/images/support-logo.png")
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

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
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
            {`Ist etwas unklar? Du möchtest bei Problemen unterstützt werden? Der DEMOCRACY Support steht Dir bei Fragen zur Seite.

Um Fehler zu beheben, ist allerdings ein qualifiziertes Feedback notwendig. Deshalb gib uns möglichst viele Informationen zu den von Dir gefunden Fehlern oder Verbesserungsvor-schlägen.

Übermittele uns daher immer einen Screenshot, eine kurze Fehlerbeschreibung sowie Deine Plattform (iOS/Android) und Deine Geräte-bezeichnung (z.B. iPhone SE), damit wir Dir schnellstmöglich helfen können. `}
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
          <Version>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default Support;
