import React from 'react';
import styled from 'styled-components/native';

const Box = styled.View`
  width: 100%;
  border-radius: 6;
  border-color: #ced1d2;
  /* padding-top: 18; */
`;

const Text = styled.Text`
  padding-vertical: 9;
  padding-horizontal: 9;
  color: #666666;
  text-align: center;
  font-size: 17;
`;

interface Props {
  text: string;
}

const Description: React.FC<Props> = ({ text }) => (
  <Box>
    <Text>{text}</Text>
  </Box>
);

export default Description;
