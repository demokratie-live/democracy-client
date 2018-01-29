import React from "react";
import styled from "styled-components/native";
import PrpoTypes from "prop-types";

const DateText = styled.Text`
  padding-top: 8;
  color: #44db5e;
  font-size: 12;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;

const Date = ({ date }) => <DateText visible={date}>{date}</DateText>;

Date.propTypes = {
  date: PrpoTypes.oneOfType([PrpoTypes.string, PrpoTypes.bool]).isRequired
};

export default Date;
