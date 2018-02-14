// @flow

import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const Slide = props => (
  <View style={props.style}>
    <Text style={props.styleText}>{props.text}</Text>
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
