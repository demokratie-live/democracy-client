import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Wrapper = styled.View`
  width: 24;
  height: 24;
  border-radius: 12;
  background-color: ${({ color }) => color};
  border-width: 1;
  border-color: rgba(74, 74, 74, 0.2);
`;

const Checkmark = styled(Ionicons).attrs({
  color: ({ value, disabledColor }) => (value ? "#fff" : disabledColor),
  size: 40,
  backgroundColor: "transparent",
  name: "ios-checkmark"
})`
  margin-top: -8;
  margin-left: 3;
`;

const Checkbox = ({ value, onPress, color }) => (
  <Wrapper onPress={onPress} color={color}>
    <Checkmark value={value} disabledColor={color} />
  </Wrapper>
);

Checkbox.propTypes = {
  value: PropTypes.bool,
  color: PropTypes.string,
  onPress: PropTypes.func
};

Checkbox.defaultProps = {
  value: false,
  color: "#4494d3",
  onPress: undefined
};

export default Checkbox;
