import React from 'react';
import { styled } from '../styles';
import { linking } from '../lib/linking';

const Wrapper = styled.TouchableOpacity`
  background-color: #efeff4;
  align-items: center;
  padding-top: 11;
  height: 50;
`;

const Text = styled.Text`
  color: #8f8e94;
`;

const LinkColorText = styled.Text`
  color: ${({ theme }) => theme.colors.background.header};
`;

export const MadeWithLove: React.FC = () => (
  <Wrapper onPress={linking('https://www.democracy-deutschland.de/#!donate')}>
    <Text>
      Made with ❤ by <LinkColorText>DEMOCRACY Deutschland e.V.</LinkColorText>
    </Text>
  </Wrapper>
);
