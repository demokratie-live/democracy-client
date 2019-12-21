import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { SearchContext } from '../../../context/Search';
import { useNavigation } from '@react-navigation/core';
import { useMutation } from '@apollo/react-hooks';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';

// import client from '../../graphql/client';

// import finishSearch from '../../graphql/mutations/finishSearch';
// import SEARCH_HISTORY_ADD from '../../graphql/mutations/local/searchHistoryAdd';
// import searchTerm from '../../graphql/queries/local/searchTerm';
// import changeSearchTerm from '../../graphql/mutations/local/changeSearchTerm';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 87;
  background-color: #4494d3;
  padding-horizontal: 11;
  padding-top: 36;
`;

const SearchInputWrapper = styled.View`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 5.5;
  flex-direction: row;
  align-items: center;
  padding-left: 6;
`;

// const SearchInputIcon = styled(Ionicons).attrs(() => ({
//   color: '#7a797b',
//   size: 16,
//   backgroundColor: 'transparent',
//   name: 'ios-search',
// }))``;

const SearchInput = styled.TextInput.attrs(() => ({
  clearButtonMode: 'always',
  autoFocus: true,
  placeholderTextColor: '#7a797b',
  underlineColorAndroid: 'transparent',
  selectionColor: '#000',
  returnKeyType: 'search',
}))`
  flex: 1;
  font-size: 14;
  height: 28;
  padding-horizontal: 6;
  color: #000;
`;

const SearchBackTextIos = styled.Button.attrs(() => ({
  color: '#fff',
}))`
  padding-left: 8;
  font-size: 17;
`;

export const SearchHeader: React.FC = () => {
  const { setTerm, term, addToHistory } = useContext(SearchContext);
  const [executeFinishSearch] = useMutation<
    FinishSearch,
    FinishSearchVariables
  >(FINISH_SEARCH);
  const navigation = useNavigation();

  const finishSearch = () => {
    addToHistory(term);
    executeFinishSearch({
      variables: {
        term,
      },
    });
  };

  return (
    <Wrapper>
      <SearchInputWrapper>
        {/* <SearchInputIcon /> */}
        <SearchInput
          placeholder="Suche"
          onChangeText={setTerm}
          value={term}
          onSubmitEditing={finishSearch}
        />
      </SearchInputWrapper>

      <SearchBackTextIos title="Zurück" onPress={navigation.goBack} />
    </Wrapper>
  );
};
