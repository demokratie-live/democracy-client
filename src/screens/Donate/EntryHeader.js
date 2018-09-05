import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  height: 30;
  background-color: #efeff4;
  justify-content: center;
  padding-horizontal: 18;
  shadowColor: #c8c7cc
  shadow-offset: {
    width: 0,
    height: -0.5
  }
`;

const Title = styled.Text`
  font-size: 13;
`;

const EntryHeader = ({ title, style }) => (
  <Wrapper style={style}>
    <Title>{title}</Title>
  </Wrapper>
);

EntryHeader.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.shape(),
};

EntryHeader.defaultProps = {
  style: {},
};

export default EntryHeader;
