import React from 'react';
import { SearchBar } from '@democracy-deutschland/ui';
import styled from 'styled-components/native';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchHistoryState, searchTermState } from '../../api/state/search';
import { useFinishSearchMutation } from '../../__generated__/graphql';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background.secondary};
`;

export const SearchHeader: React.FC = () => {
  const [term, setTerm] = useRecoilState(searchTermState);
  const setHistory = useSetRecoilState(searchHistoryState);
  const [executeFinishSearch] = useFinishSearchMutation();

  const finishSearch = () => {
    setHistory(prev => new Set([term, ...prev]));
    executeFinishSearch({
      variables: {
        term,
      },
    });
  };

  // throttle to handle android endless changing error
  const onChangeText = (text: string) => {
    if (typeof text === 'string') {
      setTerm(text);
    }
  };
  return (
    <Wrapper>
      <SearchBar
        textInput={{
          placeholder: 'Suche',
          onSubmitEditing: finishSearch,
          onChangeText: onChangeText,
          value: term,
        }}
      />
      {/* <SearchBar2
        ref={searchBarRef}
        placeholder="Suche"
        text={term}
        onChangeText={onChangeText}
        onSearchButtonPress={finishSearch}
        showsCancelButton={false}
        showsCancelButtonWhileEditing={false}
        textFieldBackgroundColor="rgba(255,255,255,.5)"
        hideBackground
      /> */}
    </Wrapper>
  );
};
