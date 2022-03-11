import React from 'react';
import styled from 'styled-components/native';

const SegmentWrapper = styled.View`
  padding-vertical: 5px;
  padding-horizontal: 18px;
  flex-direction: row;
  background-color: #efeff4;
  align-items: center;
`;

const Text = styled.Text`
  color: #6d6d72;
`;

interface Props {
  text: string;
}

export const Segment: React.FC<Props> = ({ text }) => (
  <SegmentWrapper>
    <Text>{text}</Text>
  </SegmentWrapper>
);
