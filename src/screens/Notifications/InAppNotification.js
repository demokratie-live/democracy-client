import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const Wrapper = styled.View`
  width: ${Dimensions.get("window").width};
  padding-horizontal: 18;
  padding-vertical: 18;
  background-color: ${({ color }) => color};
  align-items: center;
`;

const Title = styled.Text`
  font-weight: bold;
`;

const Description = styled.Text``;

const InAppNotification = ({ title, description, color }) => (
  <Wrapper color={color}>
    <Title>{title}</Title>
    {description && <Description>{description}</Description>}
  </Wrapper>
);

InAppNotification.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  color: PropTypes.string
};

InAppNotification.defaultProps = {
  description: false,
  color: "orange"
};

export default InAppNotification;
