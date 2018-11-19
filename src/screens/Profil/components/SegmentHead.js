import React from 'react';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  background-color: transparent;
  height: 30;
  justify-content: center;
  padding-left: 18;
`;

const Text = styled.Text`
  font-size: 13;
  color: #6d6d72;
`;

const SegmentHead = ({ children }) => (
  <Wrapper>
    <Text>{children.toUpperCase()}</Text>
  </Wrapper>
);

export default SegmentHead;
