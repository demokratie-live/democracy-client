import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation, Navigator } from "react-native-navigation";
import { withApollo, graphql, compose, ApolloProvider } from "react-apollo";
import { TouchableHighlight } from "react-native";

import Header from "./Header";
import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";
import ListSectionHeader from "../../components/ListSectionHeader";

import client from "../../graphql/client";

import searchProcedures from "../../graphql/queries/searchProcedures";
import mostSearched from "../../graphql/queries/mostSearched";
import searchTerm from "../../graphql/queries/local/searchTerm";
import SEARCH_HISTORY from "../../graphql/queries/local/searchHistory";
import finishSearch from "../../graphql/mutations/finishSearch";
import changeSearchTerm from "../../graphql/mutations/local/changeSearchTerm";
import SEARCH_HISTORY_ADD from "../../graphql/mutations/local/searchHistoryAdd";

import preventNavStackDuplicate from "../../hocs/preventNavStackDuplicate";
import withApolloClient from "../../lib/withApollo";

Navigation.registerComponent("democracy.Search.Header", () =>
  withApolloClient(Header)
);

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const List = styled.SectionList``;

const ListText = styled.Text`
  font-size: 18;
  color: grey;
  padding-left: 8;
`;

const Text = styled.Text`
  font-size: 18;
  color: grey;
`;

const ActivityIndicator = styled.ActivityIndicator.attrs({
  size: "large"
})``;

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

const NoResultsImage = styled.Image.attrs({
  source: require("../../../assets/images/search_no_results.png"),
  opacity: 0.2
})`
  margin-top: 18;
`;

class SearchScreen extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#4494d3"
  };

  constructor(props) {
    super(props);

    Navigation.events().bindComponent(this);

    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {
          component: { name: "democracy.Search.Header", alignment: "fill" }
        },
        backButton: {
          visible: false
        },
        leftButtons: [],
        rightButtons: [
          {
            id: "back",
            text: "Zurück"
          }
        ]
      }
    });
  }

  state = {
    searchData: [],
    loading: false
  };

  componentDidMount() {
    const { updateSearchTerm } = this.props;
    updateSearchTerm({
      variables: { term: "" }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.onChangeTerm(nextProps.searchTerm);
  }

  onChangeTerm = async term => {
    this.setState({ loading: true });
    const { client: { watchQuery } } = this.props;

    if (!this.observableSearchQuery) {
      this.observableSearchQuery = await watchQuery({
        query: searchProcedures,
        variables: { term },
        fetchPolicy: "network-only"
      });

      this.observableSearchQuery.subscribe({
        next: result => {
          if (result.data) {
            this.handleSearchResults({ ...result, term });
          }
        }
      });
    } else {
      this.observableSearchQuery.refetch({ term });
    }
  };

  onItemClick = ({ item, section }) => () => {
    if (section === "Ergebnisse") {
      this.props.navigateTo({
        screen: "democracy.Detail",
        title: "Abstimmung".toUpperCase(),
        passProps: { ...item }
      });
    } else {
      const { updateSearchTerm } = this.props;

      updateSearchTerm({
        variables: { term: item }
      });
      this.props.finishSearch({
        variables: {
          term: item
        }
      });
      this.props.addToSearchHistory({
        variables: {
          term: item
        }
      });
      this.onChangeTerm(item);
    }
  };

  navigationButtonPressed = ({ componentId, buttonId }) => {
    if (buttonId === "back") {
      Navigation.pop(componentId);
    }
  };

  handleSearchResults = ({
    data: {
      loading,
      searchProceduresAutocomplete: { procedures, autocomplete }
    }
  }) => {
    if (!loading) {
      const searchData = [
        { title: "Vorschläge", data: autocomplete },
        { title: "Ergebnisse", data: procedures }
      ];
      this.setState({ searchData, loading: false });
    }
  };

  observableSearchQuery = null;

  render() {
    const { loading } = this.state;
    const { mostSearchedTerms, searchTerm: term, searchHistory } = this.props;

    if (loading) {
      return (
        <LoadingWrapper>
          <ActivityIndicator />
        </LoadingWrapper>
      );
    }

    let sectionData = [];
    if (!term) {
      sectionData = [
        {
          title: "Zuletzt gesucht",
          data: searchHistory
        },
        {
          title: "Meistgesucht",
          data: mostSearchedTerms
            ? mostSearchedTerms.map(({ term: value }) => value)
            : []
        }
      ];
    } else {
      sectionData = this.state.searchData;
    }

    return (
      <Wrapper>
        <List
          sections={sectionData}
          renderSectionHeader={({ section: { title, data } }) =>
            data.length > 0 ? <ListSectionHeader title={title} /> : null
          }
          renderItem={({ item, section: { title } }) => (
            <TouchableHighlight
              onPress={this.onItemClick({ item, section: title })}
              underlayColor="rgba(68, 148, 211, 0.1)"
            >
              <ListRow>
                {title === "Ergebnisse" && (
                  <VoteListItem {...item} date={item.voteDate} />
                )}
                {title === "Zuletzt gesucht" && <ListText>{item}</ListText>}
                {title === "Vorschläge" && <ListText>{item}</ListText>}
                {title === "Meistgesucht" && <ListText>{item}</ListText>}
              </ListRow>
            </TouchableHighlight>
          )}
          keyExtractor={item => (typeof item === "string" ? item : item._id)}
          ListEmptyComponent={() => {
            const { term: value } = this.state;
            if (value) {
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
      </Wrapper>
    );
  }
}

SearchScreen.propTypes = {
  navigateTo: PropTypes.func.isRequired,
  finishSearch: PropTypes.func.isRequired,
  updateSearchTerm: PropTypes.func.isRequired,
  mostSearchedTerms: PropTypes.arrayOf(PropTypes.shape()),
  searchTerm: PropTypes.string.isRequired,
  addToSearchHistory: PropTypes.func.isRequired,
  searchHistory: PropTypes.arrayOf(PropTypes.string)
};

SearchScreen.defaultProps = {
  mostSearchedTerms: [],
  searchHistory: []
};

export default withApollo(
  preventNavStackDuplicate(
    compose(
      // Queries
      graphql(mostSearched, {
        props: ({
          data: {
            mostSearched: mostSearchedTerms,
            refetch: refetchMostSearched
          }
        }) => ({
          mostSearchedTerms,
          refetchMostSearched
        }),
        options: () => ({
          fetchPolicy: "cache-and-network"
        })
      }),

      graphql(searchTerm, {
        props: ({ data: { searchTerm: searchTermData } }) =>
          searchTermData
            ? { searchTerm: searchTermData.term }
            : { searchTerm: "" }
      }),
      graphql(SEARCH_HISTORY, {
        props: ({ data: { searchHistory } }) => ({
          searchHistory: searchHistory
            ? searchHistory.map(({ term }) => term)
            : []
        })
      }),

      // Mutations
      graphql(finishSearch, { name: "finishSearch" }),
      graphql(changeSearchTerm, { name: "updateSearchTerm" }),
      graphql(SEARCH_HISTORY_ADD, { name: "addToSearchHistory" })
    )(SearchScreen)
  )
);
