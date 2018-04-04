import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Fade from "../../components/Animations/Fade";
import ForumEntry from "../../components/ForumEntry";
import BallotBox from "./BallotBox";

import onNavigationEvent from "../onNavigationEvent";

const Wrapper = styled.View`
  flex: 1;
  background-color: rgba(87, 148, 206, 0.1);
`;

const ScrollWrapper = styled.ScrollView`
  flex: 1;
`;

const Title = styled.Text`
  padding-top: 11;
  padding-horizontal: 18;
  font-size: 34;
  padding-bottom: 18;
`;

const Text = styled.Text``;

const WarnWrapper = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 130;
  background-color: rgba(0, 0, 0, 0);
`;

const WarnTextWrapper = styled.View`
  
  align-items: center;
  justify-content: center;
  padding-vertical: 11;
  background-color: rgb(255, 255, 255)
  opacity: 0.9;
`;

const WarnText = styled.Text`
  text-align: center;
  color: rgb(0, 0, 0);
  font-size: 13;
`;

const BalloutBoxWrapper = styled.View`
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

  state = {
    showWarning: true
  };

  onNavigationEvent = event => {
    onNavigationEvent({ event, navigator: this.props.navigator });
  };

  onScroll = () => {
    if (this.state.showWarning) {
      this.setState({ showWarning: false });
    }
  };

  render() {
    const { selection, procedureObjId, procedureId, navigator } = this.props;
    return (
      <Wrapper>
        <ScrollWrapper onScroll={this.onScroll}>
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
                  "https://www.bundestag.de/image/549454/16x9/570/321/a9bde5cdc0ca1328be72904a25dc9a6b/af/kw13_ostern_bild_nachher.jpg"
              }
            }}
            argumentation="pro"
          >
            <Text>Studie bestätigt: IQ steigt durchs Argumentieren </Text>
          </ForumEntry>
          <ForumEntry
            argumentation="contra"
            image={{
              source: {
                uri:
                  "https://www.bundestag.de/image/462008/16x9/596/336/e4f4245308d9f907d264e173cc388a9/RY/plenum_teaser_sitzungsverlauf_bild.jpg"
              }
            }}
          >
            <Text>Wie Gegenargumente dein Bewusstsein erweit…</Text>
          </ForumEntry>
        </ScrollWrapper>
        <WarnWrapper pointerEvents="none">
          <Fade visible={this.state.showWarning}>
            <WarnTextWrapper>
              <WarnText>
                Deine Stimme ist verbindlich und kann nicht zurückgenommen
                werden
              </WarnText>
            </WarnTextWrapper>
          </Fade>
        </WarnWrapper>
        <BalloutBoxWrapper>
          <BallotBox
            selection={selection}
            procedureObjId={procedureObjId}
            procedureId={procedureId}
            navigator={navigator}
          />
        </BalloutBoxWrapper>
      </Wrapper>
    );
  }
}

VoteVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  selection: PropTypes.string.isRequired,
  procedureId: PropTypes.string.isRequired,
  procedureObjId: PropTypes.string.isRequired
};

export default VoteVerification;
