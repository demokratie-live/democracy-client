import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import ForumEntryComponent from "../../components/ForumEntry";

import onNavigationEvent from "../onNavigationEvent";

const Wrapper = styled.View`
  flex: 1;
  background-color: #f6f6f6;
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  padding-horizontal: 18;
  padding-vertical: 18;
`;

const Title = styled.Text`
  font-size: 34;
  padding-bottom: 18;
`;

const ForumEntry = styled(ForumEntryComponent)``;

const Text = styled.Text``;

const WarnTextWrapper = styled.View`
  align-items: center;
  justify-content: center;
  padding-vertical: 22;
`;

const VotingWrapper = styled.View`
  height: 130;
  background-color: rgba(250, 250, 250, 0.9);
  border-top-width: 1;
  border-top-color: #b2b2b2;
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

    Ionicons.getImageSource(menuIcon, 24, "#FFFFFF").then(() => {
      props.navigator.setButtons({
        leftButtons: [
          {
            title: "Zurück",
            id: "closeModal"
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
        <ScrollWrapper>
          <Title>Schon gewusst?</Title>
          <ForumEntry>
            <Text>
              Hier wird in Zukunft ein Contra-Argumentstitel von einem anderen
              Nutzer stehen und das ist auch gut so, sonst bleibst du ja
              uninformiert.{" "}
            </Text>
          </ForumEntry>
          <ForumEntry
            image={{
              source: {
                uri:
                  "https://facebook.github.io/react-native/docs/assets/favicon.png"
              }
            }}
            argumentation="pro"
          >
            <Text>Studie bestätigt: IQ steigt durchs Argumentieren </Text>
          </ForumEntry>
          <ForumEntry argumentation="contra">
            <Text>Wie Gegenargumente dein Bewusstsein erweit…</Text>
          </ForumEntry>
        </ScrollWrapper>
        <WarnTextWrapper>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            Deine Stimme ist verbindlich und kann nicht zurückgenommen werden
          </Text>
        </WarnTextWrapper>
        <VotingWrapper />
      </Wrapper>
    );
  }
}

VoteVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default VoteVerification;
