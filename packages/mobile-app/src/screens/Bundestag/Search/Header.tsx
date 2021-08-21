import React, { useContext } from 'react';
import { SearchContext } from '../../../context/Search';
import { useMutation } from '@apollo/client';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import { SearchBar } from '@democracy-deutschland/ui';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';
import { styled } from '../../../styles';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.oldColors.background.header};
`;

export const SearchHeader: React.FC = () => {
  const { setTerm, term, addToHistory } = useContext(SearchContext);
  const [executeFinishSearch] = useMutation<
    FinishSearch,
    FinishSearchVariables
  >(FINISH_SEARCH);

  const finishSearch = () => {
    console.log('finishSearch', term);
    addToHistory(term);
    executeFinishSearch({
      variables: {
        term,
      },
    });
  };

  // throttle to handle android endless changing error
  const onChangeText = (text: string) => {
    if (typeof term === 'string') {
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
