import React, { useContext, useEffect } from 'react';
import styled from 'styled-components/native';
import { SectionList } from 'react-native';
import { SearchContext } from '../../../context/Search';
import { Segment } from '../List/Components/Segment';
import { Row } from '@democracy-deutschland/mobile-ui/src/components/Lists/Row';
import { ListItem } from '@democracy-deutschland/mobile-ui/src/components/Lists/ListItem';
import { useQuery, useLazyQuery, useMutation } from '@apollo/react-hooks';
import { MOST_SEARCHED } from './graphql/query/mostSearched';
import {
  MostSearched,
  MostSearched_mostSearched,
} from './graphql/query/__generated__/MostSearched';
import { SEARCH_PROCEDURES } from './graphql/query/searchProcedures';
import {
  SearchProcedures,
  SearchProceduresVariables,
  SearchProcedures_searchProceduresAutocomplete_procedures,
} from './graphql/query/__generated__/SearchProcedures';
import { communityVoteData } from '../../../lib/helper/PieChartCommunityData';
import { pieChartGovernmentData } from '../../../lib/helper/PieChartGovernmentData';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { BundestagRootStackParamList } from '../../../routes/Sidebar/Bundestag';
import {
  FinishSearch,
  FinishSearchVariables,
} from './graphql/mutation/__generated__/FinishSearch';
import { FINISH_SEARCH } from './graphql/mutation/finishSearch';
import SearchBar from 'react-native-search-bar';

// import searchProcedures from '../../graphql/queries/searchProcedures';
// import mostSearched from '../../graphql/queries/mostSearched';
// import searchTerm from '../../graphql/queries/local/searchTerm';
// import SEARCH_HISTORY from '../../graphql/queries/local/history';
// import finishSearch from '../../graphql/mutations/finishSearch';
// import changeSearchTerm from '../../graphql/mutations/local/changeSearchTerm';
// import SEARCH_HISTORY_ADD from '../../graphql/mutations/local/searchHistoryAdd';

// import preventNavStackDuplicate from '../../hocs/preventNavStackDuplicate';

const isProcedureGuard = (
  searchItem:
    | string
    | MostSearched_mostSearched
    | SearchProcedures_searchProceduresAutocomplete_procedures,
): searchItem is SearchProcedures_searchProceduresAutocomplete_procedures => {
  return (
    typeof searchItem !== 'string' &&
    (searchItem as SearchProcedures_searchProceduresAutocomplete_procedures)
      .procedureId !== undefined
  );
};

const ListText = styled.Text`
  font-size: 18;
  color: grey;
  padding-left: 8;
`;

const Text = styled.Text`
  font-size: 18;
  color: grey;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: 'large',
}))``;

const LoadingWrapper = styled.View`
  flex: 1;
  background-color: #ffffff;
  padding-top: 18;
`;

const NoResultsWrapper = styled.View`
  flex: 1;
  padding-top: 18;
  align-items: center;
`;

const NoResultsImage = styled.Image.attrs(() => ({
  source: require('./assets/search_no_results.png'),
  opacity: 0.2,
}))`
  margin-top: 18;
`;

interface Props {
  searchBarRef: React.RefObject<SearchBar>;
}

export const Results: React.FC<Props> = ({ searchBarRef }) => {
  const navigation = useNavigation<
    StackNavigationProp<BundestagRootStackParamList>
  >();
  const [executeFinishSearch] = useMutation<
    FinishSearch,
    FinishSearchVariables
  >(FINISH_SEARCH);
  const { setTerm, term, history } = useContext(SearchContext);
  const { data: mostSearchedTerms, loading: loadingMostSearched } = useQuery<
    MostSearched
  >(MOST_SEARCHED);
  const [
    executeSearch,
    { data: searchData, loading: loadingSearchProcedures, error: searchError },
  ] = useLazyQuery<SearchProcedures, SearchProceduresVariables>(
    SEARCH_PROCEDURES,
    {
      variables: {
        term,
      },
    },
  );

  useEffect(() => {
    if (term.length > 0) {
      executeSearch();
      executeFinishSearch({
        variables: { term },
      });
    }
  }, [term, executeSearch, executeFinishSearch]);

  // TODO handle errors
  if (searchError) {
    // Alert.alert(JSON.stringify(searchError));
  }

  const loading =
    (loadingMostSearched && history.length === 0) || loadingSearchProcedures;

  const onItemClick = ({
    item,
    section,
  }: {
    item:
      | string
      | SearchProcedures_searchProceduresAutocomplete_procedures
      | MostSearched_mostSearched;
    section: string;
  }) => () => {
    searchBarRef.current ? searchBarRef.current.unFocus() : undefined;
    if (section === 'Ergebnisse' && isProcedureGuard(item)) {
      navigation.navigate('Procedure', {
        procedureId: item.procedureId,
        title: item.type || item.procedureId,
      });
      // this.props.navigateTo({
      //   screen: 'democracy.Detail',
      //   title: 'Abstimmung'.toUpperCase(),
      //   passProps: { ...item },
      // });
    } else if (typeof item === 'string') {
      setTerm(item);
      // this.props.addToSearchHistory({
      //   variables: {
      //     term: item,
      //   },
      // });
    }
  };

  const handleSearchResults = ({
    searchProceduresAutocomplete: { procedures, autocomplete },
  }: SearchProcedures) => {
    return [
      { title: 'Vorschläge', data: autocomplete },
      { title: 'Ergebnisse', data: procedures },
    ];
  };

  let sectionData: { title: string; data: any[] }[] = [];
  if (!term) {
    sectionData = [
      {
        title: 'Zuletzt gesucht',
        data: history,
      },
      {
        title: 'Meistgesucht',
        data: mostSearchedTerms
          ? mostSearchedTerms.mostSearched.map(({ term: value }) => value)
          : [],
      },
    ];
  } else {
    sectionData = searchData ? handleSearchResults(searchData) : [];
  }

  return (
    <>
      {loading && (
        <LoadingWrapper>
          <ActivityIndicator />
        </LoadingWrapper>
      )}
      {!loading && (
        <SectionList<
          string | SearchProcedures_searchProceduresAutocomplete_procedures
        >
          keyboardShouldPersistTaps={'always'}
          sections={sectionData}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length > 0 ? <Segment text={title} /> : null
          }
          renderItem={({ item, section: { title } }) => (
            <Row onPress={onItemClick({ item, section: title })}>
              <>
                {title === 'Ergebnisse' && isProcedureGuard(item) && (
                  <ListItem
                    {...item}
                    subline={
                      item.sessionTOPHeading
                        ? item.sessionTOPHeading
                        : item.subjectGroups.join(', ')
                    }
                    votes={
                      item.communityVotes ? item.communityVotes.total || 0 : 0
                    }
                    govermentChart={{
                      votes: pieChartGovernmentData(item),
                      large: true,
                    }}
                    communityVotes={communityVoteData(item)}
                  />
                )}
                {title === 'Zuletzt gesucht' && <ListText>{item}</ListText>}
                {title === 'Vorschläge' && <ListText>{item}</ListText>}
                {title === 'Meistgesucht' && <ListText>{item}</ListText>}
              </>
            </Row>
          )}
          keyExtractor={item => (!isProcedureGuard(item) ? item : item._id)}
          ListEmptyComponent={() => {
            if (term) {
              return (
                <NoResultsWrapper>
                  <Text>Leider nichts gefunden.</Text>
                  <NoResultsImage />
                </NoResultsWrapper>
              );
            }
            return null;
          }}
        />
      )}
    </>
  );
};
