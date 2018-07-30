import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.TouchableOpacity`
  background-color: ${({ disabled }) => (disabled ? "#a4aab3" : "#4494d3e6  ")};
  padding-vertical: 12;
  padding-horizontal: 12;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 14;
  color: #ffffff;
`;

const Button = ({ title, onPress, disabled, style, textStyle }) => (
  <Wrapper onPress={onPress} disabled={disabled} style={style}>
    <Text style={textStyle}>{title}</Text>
  </Wrapper>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.shape(),
  textStyle: PropTypes.shape()
};

Button.defaultProps = {
  disabled: false,
  style: {},
  textStyle: {}
};

export default Button;
