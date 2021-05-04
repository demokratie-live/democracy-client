import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import m from 'moment';
import { StyleProp } from 'react-native';

interface Props {
  date: Date;
  endDate?: Date;
  long?: boolean;
  style?: StyleProp<any>;
}

const DateText = styled.Text<Pick<Props, 'date'> & { running: boolean }>`
  color: ${({ date, running }) => {
    if (running) {
      return '#f5a623';
    } else if (new Date(date) > new Date()) {
      return '#20a736';
    }
    return 'red';
  }};
  font-size: 12px;
`;

const formatDate = ({ date, endDate, long }: Props) => {
  if (date) {
    // Laufende Abstimmung
    if (
      endDate &&
      new Date(date) <= new Date() &&
      new Date(endDate) >= new Date()
    ) {
      if (long) {
        return 'Abstimmung läuft derzeit';
      }
      return 'läuft';
    }

    // Vergangene Abstimmung
    if (new Date(date) <= new Date()) {
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
        return 'Abstimmung morgen';
      }
      return 'morgen';
    }

    const hours = Math.floor(m.duration(m(date).diff(m())).asMinutes() / 60);
    const minutes = `${Math.floor(
      ((m.duration(m(date).diff(m())).asMinutes() / 60) % 1) * 60,
    )}`.padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  return null;
};

const VoteDate: React.FC<Props> = ({ date, endDate, style, long }) => {
  const [timeLeft, setTimeLeft] = useState(formatDate({ date, endDate, long }));

  useEffect(() => {
    // TODO check this interval function (should run only on feature procedures)
    if ((endDate && endDate > new Date()) || date < new Date()) {
      const intervalId = setInterval(() => {
        if (intervalId) {
          setTimeLeft(formatDate({ date, endDate, long }));
        }
      }, 10000);
      return () => {
        clearInterval(intervalId);
      };
    }
  });

  return (
    <DateText
      style={style}
      date={date}
      running={timeLeft === 'läuft' || timeLeft === 'Abstimmung läuft derzeit'}>
      {timeLeft}
    </DateText>
  );
};

export default VoteDate;
