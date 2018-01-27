import React, { Component } from "react";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

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
    searchContent: ""
  };

  clickBack = () => {
    const { navigator } = this.props;
    navigator.pop();
  };

  render() {
    const { searchContent } = this.state;
    return (
      <Wrapper>
        <SearchBackButtonAndroid onPress={this.clickBack} />
        <SearchInput
          placeholder="Suche"
          onChangeText={text => this.setState({ searchContent: text })}
          value={searchContent}
        />

        <SearchClearButtonAndroid
          visible={searchContent}
          onPress={() => this.setState({ searchContent: "" })}
        />
      </Wrapper>
    );
  }
}

Header.propTypes = {
  navigator: PropTypes.instanceOf(Navigator)
};

Header.defaultProps = {
  navigator: undefined
};

export default Header;
