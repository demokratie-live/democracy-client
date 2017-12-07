import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const RowWrapper = styled.View`
  border-bottom-width: 1;
`;

const Title = styled.Text``;
const Subtitle = styled.Text`
  color: grey;
`;
const Date = styled.Text`
  color: green;
`;
const Votes = styled.Text`
  color: red;
`;

const Row = ({
  title, subtitle, date, votes,
}) => (
  <RowWrapper>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
    <Date>{date}</Date>
    <Votes>{votes}</Votes>
  </RowWrapper>
);

Row.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  votes: PropTypes.number.isRequired,
};

export default Row;
