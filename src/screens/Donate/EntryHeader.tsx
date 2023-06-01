import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  height: 30px;
  background-color: #efeff4;
  justify-content: center;
  padding-horizontal: 18px;
  shadow-color: #c8c7cc;
`;

const Title = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

interface Props {
  title: string;
  style?: StyleProp<ViewStyle>;
}

export const EntryHeader: React.FC<Props> = ({ title, style = {} }) => (
  <Wrapper style={style}>
    <Title>{title}</Title>
  </Wrapper>
);
