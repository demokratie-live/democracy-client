import React from 'react';
import styled from 'styled-components/native';

const Row = styled.View`
  border-bottom-width: 1;
`;

const Title = styled.Text``;
const Subtitle = styled.Text`
  color: grey;
`;

export default ({ title, subtitle }) => (
  <Row>
    <Title>{title}</Title>
    <Subtitle>{subtitle}</Subtitle>
  </Row>
);
