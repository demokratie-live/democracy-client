import React from 'react';
import styled from 'styled-components/native';

interface Props {
  title: string;
}

const Wrapper = styled.View`
flex: 1
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 28px;
`;

export const PlaceholderScreen: React.FC<Props> = ({title}) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};
