import React, { useRef } from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { SearchHeader } from './Header';
import { Results } from './Results';
import SearchBar from 'react-native-search-bar';

const Wrapper = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  keyboardVerticalOffset: Platform.OS === 'ios' ? 87 : undefined,
  keyboardShouldPersistTaps: 'never',
})`
  flex: 1;
  background-color: #fff;
`;

export const Search: React.FC = () => {
  const searchBar = useRef<SearchBar>(null);
  return (
    <Wrapper>
      <SearchHeader searchBarRef={searchBar} />
      <Results searchBarRef={searchBar} />
    </Wrapper>
  );
};
