import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";

const Wrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: 13;
`;

const Icon = styled.Image.attrs({
  source: require("../../assets/icons/document.png")
})``;

const Text = styled.Text`
  padding-left: 14;
  font-size: 12;
  color: rgb(0, 118, 255);
`;

const Document = ({ text }) => (
  <Wrapper>
    <Icon />
    <Text>{text}</Text>
  </Wrapper>
);

Document.propTypes = {
  text: PropTypes.string.isRequired
};

export default Document;
