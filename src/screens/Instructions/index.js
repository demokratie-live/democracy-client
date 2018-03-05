// @flow

import React, { Component } from "react";
import Swiper from "react-native-swiper";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigator } from "react-native-navigation";
import { TouchableOpacity, Text } from 'react-native';

import Slide from "./Slide";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";

const Container = styled.View`
  flex: 1;
  backgroundColor: #fff;
`;

const Button = styled.Button.attrs({
  color: "#fff",
}) `
color: #0076ff;
height: 60pt;
font-size: 20;
`;

const BUTTON_TEXTS = {
  next: "Weiter",
  finish: "Los gehts!"
};

class Introductions extends Component {
  state = {
    buttonText: BUTTON_TEXTS.next
  };

  onClick = () => {
    if (this.swiper.state.index < this.swiper.state.total - 1) {
      this.swiper.scrollBy(1);
    } else {
      this.props.setInstructionsShown({
        variables: {
          isInstructionsShown: true
        }
      });
      this.props.navigator.dismissAllModals();
    }
  };

  onMomentumScrollEnd = () => {
    const { buttonText } = this.state;
    if (
      this.swiper.state.index === this.swiper.state.total - 1 &&
      BUTTON_TEXTS.finish !== buttonText
    ) {
      this.setState({ buttonText: BUTTON_TEXTS.finish });
    } else if (BUTTON_TEXTS.next !== buttonText) {
      this.setState({ buttonText: BUTTON_TEXTS.next });
    }
  };

  render() {
    return (
      <Container>
        <Swiper
          ref={e => {
            this.swiper = e;
          }}
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          paginationStyle={{ marginBottom: -15 }}
          style={{ marginBottom: 29 }}
          dotStyle={{ width: 5, height: 5, backgroundColor: '#4494d3', opacity: 0.5, marginTop: 12 }}
          activeDotStyle={{ width: 5, height: 5, backgroundColor: '#4494d3', marginTop: 12 }}
        >
          <Slide background="#fff" text="1" />
          <Slide background="#fff" text="2" />
          <Slide background="#fff" text="3" />
        </Swiper>
        <TouchableOpacity onPress={this.onClick} style={{ backgroundColor: '#fff', height: 60, justifyContent: 'center' }} >
          <Text style={{ textAlign: 'center', color: '#0076ff', fontSize: 20, lineHeight: 24 }}>{this.state.buttonText}</Text>
        </TouchableOpacity>
      </Container >
    );
  }
}

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(Introductions);
