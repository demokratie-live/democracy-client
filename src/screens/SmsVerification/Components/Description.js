import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Box = styled.View`
  width: 100%;
  border-radius: 6;
  border-color: #ced1d2;
`;

const Text = styled.Text`
  padding-vertical: 9;
  padding-horizontal: 9;
  color: #666666;
  text-align: center;
  font-size: 17;
`;

const Description = ({ text }) => (
  <Box>
    <Text>{text}</Text>
  </Box>
);

Description.propTypes = {
  text: PropTypes.string.isRequired
};

export default Description;
