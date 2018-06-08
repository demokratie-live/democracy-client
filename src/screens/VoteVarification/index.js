import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";

import Fade from "../../components/Animations/Fade";
import MessageRow from "../../components/ArgumentEntry/Message";
import LinkRow from "../../components/ArgumentEntry/Link";
import BallotBox from "./BallotBox";

import dummyEntryData from "../../../dummy/voteVerification";

const Wrapper = styled.View`
  flex: 1;
  background-color: rgb(246, 246, 246);
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
  border-top-color: rgba(68, 148, 211, 0.1);
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

    if (Platform.OS === "ios") {
      Ionicons.getImageSource("ios-arrow-back", 34, "#FFFFFF").then(icon => {
        props.navigator.setButtons({
          leftButtons: [
            {
              icon,
              id: "closeModal"
            }
          ]
        });
      });
    }
  }

  state = {
    showWarning: true
  };

  onScroll = () => {
    if (this.state.showWarning) {
      this.setState({ showWarning: false });
    }
  };

  renderEntries = () => {
    const { selection } = this.props;
    return dummyEntryData[selection].map(
      ({ type, argumentation, title, text, moreText, image, _id }) => {
        if (type === "message") {
          return (
            <MessageRow
              key={_id}
              text={text}
              argumentation={argumentation}
              moreText={moreText}
            />
          );
        }
        return (
          <LinkRow
            key={_id}
            image={{
              source: image
            }}
            argumentation={argumentation}
            title={title}
            text={text}
          />
        );
      }
    );
  };

  render() {
    const { selection, procedureObjId, procedureId, navigator } = this.props;
    return (
      <Wrapper>
        <ScrollWrapper onScroll={this.onScroll}>
          <Title>Schon gewusst?</Title>
          {this.renderEntries()}
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
