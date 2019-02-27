import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import m from 'moment';
import _ from 'lodash';

const DateText = styled.Text`
padding-top: 8;
padding-bottom: 2;
  color: ${({ date, soon }) => {
    if (soon) {
      return '#f5a623';
    } else if (new Date(date) > new Date()) {
      return '#20a736';
    }
    return 'red';
  }}
  font-size: 12;
  fontWeight: ${soon => (soon ? 'bold' : 'normal')}
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
`;

class DateTime extends Component {
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  shouldComponentUpdate(p) {
    const { date, long } = this.props;
    return date !== p.date || long !== p.long;
  }

  interval = null;

  formatDate = ({ date, long }) => {
    if (date) {
      if (date <= new Date()) {
        return m(date).format('DD.MM.YY');
      }
      const daysDate = m(date).endOf('day');
      const days = Math.floor(m.duration(daysDate.diff(m())).asDays());

      if (days > 1) {
        if (long) {
          return `Abstimmung in ${days} Tagen`;
        }
        return `${days} Tage`;
      } else if (days === 1) {
        if (long) {
          return `Abstimmung morgen`;
        }
        return `morgen`;
      }
      // Force update Time
      if (!this.interval) {
        this.interval = setInterval(() => {
          this.forceUpdate();
        }, 1000 * 30);
      }

      const hours = Math.floor(m.duration(m(date).diff(m())).asMinutes() / 60);
      const minutes = _.padStart(
        `${Math.floor(((m.duration(m(date).diff(m())).asMinutes() / 60) % 1) * 60)}`,
        2,
        '0',
      );
      return `${hours}:${minutes}`;
    }
    return null;
  };

  render() {
    const { date, long, ...rest } = this.props;
    const localDate = new Date(date);
    localDate.setTime(localDate.getTime() + new Date(date).getTimezoneOffset() * 1000 * 60);

    const formattedDate = this.formatDate({ date: localDate, long });

    return (
      <DateText
        visible={localDate}
        date={localDate}
        soon={
          formattedDate === 'morgen' ||
          formattedDate === 'Abstimmung morgen' ||
          formattedDate.indexOf(':') !== -1
        }
        {...rest}
      >
        {formattedDate}
      </DateText>
    );
  }
}

DateTime.propTypes = {
  date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string, PropTypes.bool])
    .isRequired,
  long: PropTypes.bool,
};

DateTime.defaultProps = {
  long: false,
};

export default DateTime;
