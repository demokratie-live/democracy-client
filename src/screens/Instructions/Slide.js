import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${({ background }) => background};
`;

const Text = styled.Text`
  color: #fff;
  font-size: 30;
  font-weight: bold;
`;

const Slide = ({ background, text }) => (
  <Container background={background}>
    <Text>{text}</Text>
  </Container>
);

Slide.propTypes = {
  background: PropTypes.string,
  text: PropTypes.string.isRequired
};

Slide.defaultProps = {
  background: ""
};

export default Slide;
