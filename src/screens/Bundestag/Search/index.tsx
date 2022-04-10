import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { SearchHeader } from './Header';
import { Results } from './Results';

const Wrapper = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 87 : undefined,
  keyboardShouldPersistTaps: 'never',
})`
  flex: 1;
  background-color: #fff;
`;

export const Search: React.FC = () => {
  return (
    <Wrapper>
      <SearchHeader />
      <Results />
    </Wrapper>
  );
};
