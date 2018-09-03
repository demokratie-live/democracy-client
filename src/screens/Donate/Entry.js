import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  height: 68;
  background-color: #f6f6f6;
  justify-content: center;
  padding-horizontal: 17;
`;

const Money = styled.Text`
  font-size: 17;
`;

const Description = styled.Text`
  font-size: 13;
  color: #9b9b9b;
`;

const Entry = ({ money, description }) => (
  <Wrapper>
    <Money>{money}</Money>
    <Description>{description}</Description>
  </Wrapper>
);

export default Entry;
