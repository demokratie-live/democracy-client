import React, { useContext } from 'react';
import { SearchContext } from '../../../context/Search';
import { useMutation } from '@apollo/react-hooks';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import SearchBar from 'react-native-search-bar';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';

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

  return (
    <SearchBar
      // ref="searchBar"
      placeholder="Suche"
      text={term}
      onChangeText={setTerm}
      onSearchButtonPress={finishSearch}
      showsCancelButton={false}
      showsCancelButtonWhileEditing={false}
    />
  );
};
