import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Slide = ({ style, styleText, text }) => (
  <View style={style}>
    <Text style={styleText}>{text}</Text>
  </View>
);

Slide.propTypes = {
  style: PropTypes.number,
  styleText: PropTypes.number,
  text: PropTypes.string.isRequired
};

Slide.defaultProps = {
  style: {},
  styleText: {}
};

export default Slide;
