import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.View`
  width: 24;
  height: 24;
  border-radius: 12;
  background-color: ${({ value, color, disabledColor }) => (value ? color : disabledColor)};
  border-width: 1;
  border-color: rgba(74, 74, 74, 0.2);
`;

const Checkmark = styled(Ionicons).attrs(({ value, disabledColor }) => ({
  color: value ? '#fff' : disabledColor,
  size: 40,
  backgroundColor: 'transparent',
  name: 'ios-checkmark',
}))`
  margin-top: -8;
  margin-left: 3;
`;

const Checkbox = ({ value, onPress, color, disabledColor, disabledCheckmarkColor }) => (
  <Wrapper onPress={onPress} color={color} disabledColor={disabledColor} value={value}>
    <Checkmark value={value} disabledColor={disabledCheckmarkColor} />
  </Wrapper>
);

Checkbox.propTypes = {
  value: PropTypes.bool,
  color: PropTypes.string,
  disabledColor: PropTypes.string,
  disabledCheckmarkColor: PropTypes.string,
  onPress: PropTypes.func,
};

Checkbox.defaultProps = {
  value: false,
  color: '#4494d3', // #4494d3
  disabledColor: '#fff',
  disabledCheckmarkColor: '#fff',
  onPress: undefined,
};

export default Checkbox;
