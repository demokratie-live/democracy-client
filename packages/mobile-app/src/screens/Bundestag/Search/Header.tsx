import React, { useContext } from 'react';
import { SearchContext } from '../../../context/Search';
import { useMutation } from '@apollo/react-hooks';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import SearchBar from 'react-native-search-bar';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';
import debounce from 'lodash.debounce';
import { Platform } from 'react-native';
import { styled } from '../../../styles';

const Wrapper = styled.View`
  background-color: ${({ theme }) => theme.colors.background.header};
`;

export const SearchHeader: React.FC = () => {
  const { setTerm, term, addToHistory } = useContext(SearchContext);
  const [executeFinishSearch] = useMutation<
    FinishSearch,
    FinishSearchVariables
  >(FINISH_SEARCH);

  const finishSearch = () => {
    addToHistory(term);
    executeFinishSearch({
      variables: {
        term,
      },
    });
  };

  // throttle to handle android enles changeing error
  const onChangeText =
    Platform.OS === 'ios'
      ? setTerm
      : debounce((text: string) => setTerm(text), 300);

  return (
    <Wrapper>
      <SearchBar
        // ref="searchBar"
        placeholder="Suche"
        text={term}
        onChangeText={onChangeText}
        onSearchButtonPress={finishSearch}
        showsCancelButton={false}
        showsCancelButtonWhileEditing={false}
        textFieldBackgroundColor="rgba(255,255,255,.5)"
        hideBackground
      />
    </Wrapper>
  );
};
