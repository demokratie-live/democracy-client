import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 24;
  height: 24;
  border-radius: 12;
  background-color: #4494d3;
  align-items: center;
  justify-content: center;
`;

const Checkmark = styled.View`
  width: 12;
  height: 12;
  border-radius: 6;
  background-color: ${({ value }) => (value ? '#fff' : '#4494d3')};
`;

const Radio = ({ value, onPress }) => (
  <Wrapper onPress={onPress}>
    <Checkmark value={value} />
  </Wrapper>
);

Radio.propTypes = {
  value: PropTypes.bool,
  onPress: PropTypes.func,
};

Radio.defaultProps = {
  value: false,
  onPress: undefined,
};

export default Radio;
