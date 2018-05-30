import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import m from "moment";

const DateText = styled.Text`
  padding-top: 8;
  color: ${({ date }) => (new Date(date) > new Date() ? "#20a736" : "red")};
  font-size: 12;
  display: ${({ visible }) => (visible ? "flex" : "none")};
`;

class DateTime extends Component {
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
  interval = null;

  formatDate = date => {
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
      // Force update Time
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.forceUpdate();
        }, 1000 * 10);
      }

      const hours = Math.floor(m.duration(m(date).diff(m())).asMinutes() / 60);
      const minutes = `${Math.floor(
        ((m.duration(m(date).diff(m())).asMinutes() / 60) % 1) * 60
      )}`.padStart(2, "0");
      return `${hours}:${minutes}`;
    }
    return null;
  };

  render() {
    const { date } = this.props;
    return (
      <DateText visible={date} date={date}>
        {this.formatDate(date)}
      </DateText>
    );
  }
}

DateTime.propTypes = {
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
    PropTypes.bool
  ]).isRequired
};

export default DateTime;
