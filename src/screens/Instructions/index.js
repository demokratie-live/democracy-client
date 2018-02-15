// @flow

import React, { Component } from "react";
import Swiper from "react-native-swiper";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import Slide from "./Slide";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";

const Container = styled.View`
  flex: 1;
`;

const Button = styled.Button``;

const BUTTON_TEXTS = {
  next: "Weiter >",
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
        >
          <Slide background="#9DD6EB" text="1" />
          <Slide background="#97CAE5" text="2" />
          <Slide background="#92BBD9" text="3" />
        </Swiper>
        <Button
          onPress={this.onClick}
          title={this.state.buttonText}
          accessibilityLabel={this.state.buttonText}
        />
      </Container>
    );
  }
}

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(Introductions);
