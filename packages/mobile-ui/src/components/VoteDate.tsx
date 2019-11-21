import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import m from 'moment';

interface Props {
  date: Date;
  endDate?: Date;
  long?: boolean;
}

const DateText = styled.Text<Pick<Props, 'date'> & { running: boolean }>`
  padding-top: 8;
  padding-bottom: 2;
  color: ${({ date, running }) => {
    if (running) {
      return '#f5a623';
    } else if (new Date(date) > new Date()) {
      return '#20a736';
    }
    return 'red';
  }};
  font-size: 12;
  font-weight: ${soon => (soon ? 'bold' : 'normal')};
`;

const formatDate = ({ date, endDate, long }: Props) => {
  if (date) {
    // Laufende Abstimmung
    if (endDate && date <= new Date() && endDate >= new Date()) {
      if (long) {
        return 'Abstimmung läuft derzeit';
      }
      return 'läuft';
    }

    // Vergangene Abstimmung
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

const VoteDate: React.FC<Props> = ({ date, endDate }) => {
  const [tileLeft, setTimeLeft] = useState(formatDate({ date, endDate }));

  useEffect(() => {
    if ((endDate && endDate >= new Date()) || date <= new Date()) {
      const intervalId = setTimeout(() => {
        if (intervalId) {
          setTimeLeft(formatDate({ date, endDate }));
        }
      });
      return () => {
        clearInterval(intervalId);
      };
    }
  });

  return (
    <DateText
      date={date}
      running={tileLeft === 'läuft' || tileLeft === 'Abstimmung läuft derzeit'}>
      {tileLeft}
    </DateText>
  );
};

export default VoteDate;
