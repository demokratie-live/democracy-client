// @flow

import * as React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Swiper from "react-native-swiper";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import SET_INSTRUCTIONS_SHOWN from "../graphql/mutations/setInstructinosShown";

const SkipButton = ({ onFinish, position }) => (
  <View style={position}>
    <Button
      onPress={onFinish}
      title="Überspringen"
      accessibilityLabel="Überspringen"
    />
  </View>
);

SkipButton.propTypes = {
  onFinish: PropTypes.func.isRequired,
  position: PropTypes.shape.isRequired
};

const FinishButton = ({ onFinish, position }) => (
  <View style={position}>
    <Button
      onPress={onFinish}
      title="Los gehts!"
      accessibilityLabel="Los gehts!"
    />
  </View>
);

FinishButton.propTypes = {
  onFinish: PropTypes.func.isRequired,
  position: PropTypes.shape.isRequired
};

const Slide = ({ style, styleText, text, onFinish, showFinish }) => (
  <View style={style}>
    <Text style={styleText}>{text}</Text>
    {!showFinish && (
      <SkipButton onFinish={onFinish} position={stylesSlide.skip} />
    )}
    {showFinish && (
      <FinishButton onFinish={onFinish} position={stylesSlide.finish} />
    )}
  </View>
);

Slide.propTypes = {
  style: PropTypes.shape.isRequired,
  styleText: PropTypes.shape.isRequired,
  text: PropTypes.string.isRequired,
  onFinish: PropTypes.func.isRequired,
  showFinish: PropTypes.bool.isRequired
};

const stylesSlide = StyleSheet.create({
  skip: {
    position: "absolute",
    left: 0,
    bottom: 0
  },
  finish: {
    position: "absolute",
    right: 0,
    bottom: 0
  }
});

const Introductions = ({ setInstructionsShown }) => {
  const onFinish = () => {
    setInstructionsShown({
      variables: {
        isInstructionsShown: true
      }
    });
  };
  return (
    <Swiper style={styles.wrapper} loop={false}>
      <Slide
        style={styles.slide1}
        styleText={styles.text}
        text="Hello Swiper"
        onFinish={onFinish}
      />
      <Slide
        style={styles.slide2}
        styleText={styles.text}
        text="Beautiful"
        onFinish={onFinish}
      />
      <Slide
        style={styles.slide3}
        styleText={styles.text}
        text="And simple"
        onFinish={onFinish}
        showFinish
      />
    </Swiper>
  );
};

Introductions.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  wrapper: {},
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

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(Introductions);
