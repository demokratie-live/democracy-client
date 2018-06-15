import React, { Component } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import m from "moment";
import _ from "lodash";

const DateText = styled.Text`
  padding-top: 8;
  color: ${({ date, soon }) => {
    if (soon) {
      return "#f5a623";
    } else if (new Date(date) > new Date()) {
      return "#20a736";
    }
    return "red";
  }}
  font-size: 12;
  fontWeight: ${soon => (soon ? "bold" : "normal")}
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
      if (date <= new Date()) {
        return m(date).format("DD.MM.YY");
      }
      const daysDate = m(date).endOf("day");
      const days = Math.floor(m.duration(daysDate.diff(m())).asDays());

      if (days > 1) {
        return `${days} Tage`;
      } else if (days === 1) {
        return `morgen`;
      }
      // Force update Time
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.forceUpdate();
        }, 1000 * 10);
      }

      const hours = Math.floor(m.duration(m(date).diff(m())).asMinutes() / 60);
      const minutes = _.padStart(`${Math.floor(
        ((m.duration(m(date).diff(m())).asMinutes() / 60) % 1) * 60
      )}`, 2, '0');
      return `${hours}:${minutes}`;
    }
    return null;
  };

  render() {
    const { date } = this.props;
    const localDate = new Date(date);
    localDate.setTime(
      localDate.getTime() + new Date(date).getTimezoneOffset() * 1000 * 60
    );
    console.log({ localDate });
    const formattedDate = this.formatDate(localDate);

    return (
      <DateText
        visible={localDate}
        date={localDate}
        soon={formattedDate === "morgen" || formattedDate.indexOf(":") !== -1}
      >
        {formattedDate}
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
