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

class Introductions extends Component {
  state = {
    buttonText: "Weiter >"
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
    if (this.swiper.state.index === this.swiper.state.total - 1) {
      this.setState({ buttonText: "Los gehts!" });
    } else {
      this.setState({ buttonText: "Weiter >" });
    }
  };

  refSwiper = sw => {
    this.swiper = sw;
  };

  render() {
    return (
      <Container>
        <Swiper
          ref={this.refSwiper}
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
