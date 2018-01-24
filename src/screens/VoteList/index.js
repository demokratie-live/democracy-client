// @flow

import React, { Component } from "react";
import { Platform, Text, SegmentedControlIOS } from "react-native";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import styled from "styled-components/native";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";

const Screen = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const SegmentControlsWrapper = styled.View`
  background-color: #4494d3;
  height: 35;
  padding-left: 10;
  padding-right: 10;
`;

class VoteList extends Component {
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

  static navigatorButtons = {
    rightButtons: [
      {
        icon: require("../../../assets/icons/search.png"),
        id: "search",
        buttonColor: "#ffffff"
      }
    ],
    leftButtons: [
      {
        icon: require("../../../assets/icons/grabber.png"),
        id: "menu",
        buttonColor: "#ffffff"
      }
    ]
  };

  state = {
    selectedIndex: 0,
    listType: "ABSTIMMUNG"
  };

  showIntroAgain = () => {
    const { setInstructionsShown } = this.props;
    setInstructionsShown({
      variables: {
        isInstructionsShown: false
      }
    });
  };

  renderSegmentControls = () => {
    if (Platform.OS === "ios") {
      return (
        <SegmentControlsWrapper>
          <SegmentedControlIOS
            values={["in Abstimmung", "in Vorbereitung", "What's hot?"]}
            selectedIndex={this.state.selectedIndex}
            tintColor="#ffffff"
            onChange={event => {
              this.setState({
                selectedIndex: event.nativeEvent.selectedSegmentIndex
              });
            }}
          />
        </SegmentControlsWrapper>
      );
    }
    return null;
  };
  render() {
    console.log(this.props);
    return (
      <Screen>
        {this.renderSegmentControls()}
        <Text>!{this.props.listType}!</Text>
      </Screen>
    );
  }
}

VoteList.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(VoteList);
