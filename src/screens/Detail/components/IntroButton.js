import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40;
`;

const IntroButton = ({ children, onPress }) => <Button onPress={onPress}>{children}</Button>;

IntroButton.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func.isRequired,
};

IntroButton.defaultProps = {};

export default IntroButton;
