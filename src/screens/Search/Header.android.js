import React, { Component } from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { graphql, compose } from "react-apollo";

import client from "../../graphql/client";

import finishSearch from "../../graphql/mutations/finishSearch";
import searchTerm from "../../graphql/queries/local/searchTerm";
import changeSearchTerm from "../../graphql/mutations/local/changeSearchTerm";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: 16;
`;

const Icons = styled(Ionicons.Button).attrs({
  color: "#fff",
  size: 30,
  backgroundColor: "transparent"
})``;

const SearchInput = styled.TextInput.attrs({
  clearButtonMode: "always",
  autoFocus: true,
  placeholderTextColor: "rgba(255, 255, 255, 0.38)",
  underlineColorAndroid: "transparent",
  selectionColor: "#fff",
  returnKeyType: "search"
})`
  flex: 1;
  background-color: transparent;
  border-radius: 5.5;
  font-size: 20;
  color: #fff;
`;

const SearchBackButtonAndroid = styled(Icons).attrs({
  name: "md-arrow-back"
})`
  padding-right: 16;
`;

const SearchClearButtonAndroid = styled(Icons).attrs({
  name: "md-close"
})`
  display: ${({ visible }) => (visible ? "flex" : "none")};
  padding-left: 16;
`;

class Header extends Component {
  state = {
    term: ""
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.term !== this.state.term) {
      this.setState({ term: nextProps.term });
    }
  }

  onChangeTerm = term => {
    const { updateSearchTerm } = this.props;
    this.setState({ term });
    updateSearchTerm({
      variables: {
        term
      }
    });
  };

  clickBack = () => {
    const { navigator } = this.props;
    navigator.pop();
  };

  finishSearch = () => {
    client.mutate({
      mutation: finishSearch,
      variables: {
        term: this.state.term
      }
    });
  };

  render() {
    const { term } = this.state;
    return (
      <Wrapper>
        <SearchBackButtonAndroid onPress={this.clickBack} />
        <SearchInput
          placeholder="Suche"
          onChangeText={this.onChangeTerm}
          value={term}
          onSubmitEditing={this.finishSearch}
        />

        <SearchClearButtonAndroid
          visible={term}
          onPress={() => this.onChangeTerm("")}
        />
      </Wrapper>
    );
  }
}

Header.propTypes = {
  navigator: PropTypes.instanceOf(Navigator),
  updateSearchTerm: PropTypes.func.isRequired,
  term: PropTypes.string.isRequired
};

Header.defaultProps = {
  navigator: undefined
};

export default compose(
  // Queries
  graphql(searchTerm, {
    props: ({ data: { searchTerm: term } }) =>
      term ? { term: term.term } : { term: "" }
  }),

  // Mutations
  graphql(changeSearchTerm, { name: "updateSearchTerm" })
)(Header);
