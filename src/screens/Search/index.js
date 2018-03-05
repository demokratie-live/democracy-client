import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation, Navigator } from "react-native-navigation";

import Header from "./Header";

Navigation.registerComponent("democracy.Search.Header", () => Header);

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HelloWorld = styled.Text``;

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
        navigator: this.props.navigator
      }
    });
  }
  render() {
    return (
      <Wrapper>
        <HelloWorld>SUCHE</HelloWorld>
      </Wrapper>
    );
  }
}

SearchScreen.propTypes = {
  navigator: PropTypes.instanceOf(Navigator)
};

SearchScreen.defaultProps = {
  navigator: undefined
};

export default SearchScreen;
