import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { SearchContext } from '../../../context/Search';
import { useMutation } from '@apollo/react-hooks';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

// import client from '../../graphql/client';

// import finishSearch from '../../graphql/mutations/finishSearch';
// import SEARCH_HISTORY_ADD from '../../graphql/mutations/local/searchHistoryAdd';
// import searchTerm from '../../graphql/queries/local/searchTerm';
// import changeSearchTerm from '../../graphql/mutations/local/changeSearchTerm';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  min-height: ${Platform.OS === 'android' ? 56 : undefined};
  background-color: #4494d3;
`;

// const Icons = styled(Ionicons.Button).attrs(() => ({
//   color: '#fff',
//   size: 30,
//   backgroundColor: 'transparent',
// }))``;

const SearchInput = styled.TextInput.attrs(() => ({
  clearButtonMode: 'always',
  autoFocus: true,
  placeholderTextColor: 'rgba(255, 255, 255, 0.38)',
  underlineColorAndroid: 'transparent',
  selectionColor: '#fff',
  returnKeyType: 'search',
}))`
  flex: 1;
  background-color: transparent;
  border-radius: 5.5;
  font-size: 20;
  color: #fff;
`;

// const SearchClearButtonAndroid = styled(Icons).attrs(() => ({
//   name: 'md-close',
// }))`
//   display: ${({ visible }) => (visible ? 'flex' : 'none')};
//   padding-left: 16;
// `;

// TODO fix and check logic for finish search with ios version

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
      <Button onPress={navigation.goBack} text="Zurück" textColor="white" />
      <SearchInput
        placeholder="Suche"
        onChangeText={setTerm}
        value={term}
        onSubmitEditing={finishSearch}
      />

      <Button onPress={() => setTerm('')} text="X" textColor="white" />
    </Wrapper>
  );
};
