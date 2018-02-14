// @flow

import React, { Component } from "react";
import { StyleSheet, View, Button } from "react-native";
import Swiper from "react-native-swiper";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import Slide from "./Slide";

import SET_INSTRUCTIONS_SHOWN from "../../graphql/mutations/setInstructinosShown";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {},
  button: {
    alignSelf: "flex-end",
    position: "absolute",
    bottom: 35
  },
  slide1: {
    flex: 1,
    backgroundColor: "#9DD6EB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5"
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold"
  }
});

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
      <View style={styles.container}>
        <Swiper
          ref={this.refSwiper}
          style={styles.wrapper}
          loop={false}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
        >
          <Slide
            style={styles.slide1}
            styleText={styles.text}
            text="Hello Swiper"
          />
          <Slide
            style={styles.slide2}
            styleText={styles.text}
            text="Beautiful"
          />
          <Slide
            style={styles.slide3}
            styleText={styles.text}
            text="And simple"
          />
        </Swiper>
        <Button
          style={styles.button}
          onPress={this.onClick}
          title={this.state.buttonText}
          accessibilityLabel={this.state.buttonText}
        />
      </View>
    );
  }
}

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired
};

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(Introductions);
