import React from 'react';
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

export default EntryHeader;
