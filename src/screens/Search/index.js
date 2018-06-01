import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation, Navigator } from "react-native-navigation";
import { withApollo } from "react-apollo";
import { TouchableHighlight } from "react-native";

import Header from "./Header";
import ListRow from "../../components/ListRow";
import VoteListItem from "../../components/VoteListItem";

import searchProcedures from "../../graphql/queries/searchProcedures";

import prevetNavStackDuplicate from "../../hocs/preventNavStackDuplicate";

Navigation.registerComponent("democracy.Search.Header", () => Header);

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const List = styled.FlatList``;

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
    this.props.navigator.setStyle({
      navBarCustomView: "democracy.Search.Header",
      navBarComponentAlignment: "fill",
      navBarCustomViewInitialProps: {
        navigator: this.props.navigator,
        onChangeTerm: this.onChangeTerm
      }
    });
  }

  state = {
    procedures: [],
    term: "",
    loading: false
  };

  onChangeTerm = async term => {
    this.setState({ loading: true, term });
    const { client: { watchQuery } } = this.props;

    this.observableSearchQuery = this.observableSearchQuery.filter(
      ({ term: queryTerm }) => {
        if (queryTerm !== term) {
          // query.unsubscribe();
          return false;
        }
        return true;
      }
    );

    this.observableSearchQuery.push({
      term,
      query: await watchQuery({
        query: searchProcedures,
        variables: { term }
      })
    });

    const { query } = this.observableSearchQuery.find(
      ({ term: queryTerm }) => term === queryTerm
    );

    query.subscribe({
      next: ({ data: { searchProcedures: procedures } }) => {
        if (this.state.term === term) {
          this.setState({ procedures, loading: false });
        }
      }
    });
  };

  onItemClick = ({ item }) => () => {
    this.props.navigateTo({
      screen: "democracy.Detail",
      title: "Abstimmung".toUpperCase(),
      passProps: { ...item }
    });
  };

  observableSearchQuery = [];

  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <LoadingWrapper>
          <ActivityIndicator />
        </LoadingWrapper>
      );
    }

    return (
      <Wrapper>
        <List
          data={this.state.procedures}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={this.onItemClick({ item })}
              underlayColor="rgba(68, 148, 211, 0.1)"
            >
              <ListRow>
                <VoteListItem {...item} />
              </ListRow>
            </TouchableHighlight>
          )}
          keyExtractor={({ _id }) => _id}
          ListEmptyComponent={() => {
            const { term } = this.state;
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
      </Wrapper>
    );
  }
}

SearchScreen.propTypes = {
  navigator: PropTypes.instanceOf(Navigator),
  navigateTo: PropTypes.func.isRequired
};

SearchScreen.defaultProps = {
  navigator: undefined
};

export default withApollo(prevetNavStackDuplicate(SearchScreen));
