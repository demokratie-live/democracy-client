import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import m from "moment";

const DateText = styled.Text`
  padding-top: 8;
  color: ${({ date }) => (new Date(date) > new Date() ? "#44db5e" : "red")};
  font-size: 12;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;

const formatDate = date => {
  if (date) {
    if (new Date(date) <= new Date()) {
      return m(date).format("DD.MM.YY");
    }
    const days = Math.floor(m.duration(m(date).diff(m())).asDays());
    if (days > 1) {
      return `${days} Tage`;
    } else if (days === 1) {
      return `${days} Tag`;
    }
    const hours = Math.floor(m.duration(m(date).diff(m())).asMinutes() / 60);
    const minutes = Math.floor(
      ((m.duration(m(date).diff(m())).asMinutes() / 60) % 1) * 60
    );
    return `${hours}:${minutes}`;
  }
  return null;
};

const DateTime = ({ date }) => (
  <DateText visible={date} date={date}>
    {formatDate(date)}
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
