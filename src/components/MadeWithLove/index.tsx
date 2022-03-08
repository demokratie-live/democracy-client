import React from 'react';
import styled from 'styled-components/native';
import { linking } from '../../lib/linking';

const Wrapper = styled.TouchableOpacity`
  background-color: #efeff4;
  align-items: center;
  padding-top: 11px;
  height: 50px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const LinkColorText = styled.Text`
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

export const MadeWithLove: React.FC = () => (
  <Wrapper onPress={linking('https://www.democracy-deutschland.de/#!donate')}>
    <Text>
      Made with ❤ by <LinkColorText>DEMOCRACY Deutschland e.V.</LinkColorText>
    </Text>
  </Wrapper>
);
