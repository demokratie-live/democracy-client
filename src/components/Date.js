import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import m from "moment";

const DateText = styled.Text`
  padding-top: 8;
  color: ${({ date }) => (date > new Date() ? "#44db5e" : "red")};
  font-size: 12;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;

const DateTime = ({ date }) => (
  <DateText visible={date} date={date}>
    {date && m(date).format("DD.MM.YY")}
  </DateText>
);

DateTime.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.bool
  ]).isRequired
};

export default DateTime;
