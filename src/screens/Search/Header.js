import React, { Component } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${Platform.OS === "ios" ? 0 : 16};
`;

const Icons = styled(Ionicons.Button).attrs({
  color: "#fff",
  size: 30,
  backgroundColor: "transparent"
})``;

const SearchInput = styled.TextInput.attrs({
  clearButtonMode: "always",
  autoFocus: true,
  placeholderTextColor:
    Platform.OS === "ios" ? "#7a797b" : "rgba(255, 255, 255, 0.38)",
  underlineColorAndroid: "transparent",
  selectionColor: Platform.OS === "ios" ? "#000" : "#fff",
  returnKeyType: "search"
})`
  flex: 1;
  background-color: ${Platform.OS === "ios"
    ? "rgba(255, 255, 255, 0.8)"
    : "transparent"};
  border-radius: 5.5;
  font-size: ${Platform.OS === "ios" ? 14 : 20};
  height: ${Platform.OS === "ios" ? 28 : "auto"};
  padding-horizontal: ${Platform.OS === "ios" ? 6 : 0};
  color: ${Platform.OS === "ios" ? "#000" : "#fff"};
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

const SearchBackTextIos = styled.Button.attrs({
  color: "#fff"
})`
  padding-left: 8;
  font-size: 17;
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
        {Platform.OS === "android" && (
          <SearchBackButtonAndroid onPress={this.clickBack} />
        )}
        <SearchInput
          placeholder="Suche"
          onChangeText={text => this.setState({ searchContent: text })}
          value={searchContent}
        />

        {Platform.OS === "android" && (
          <SearchClearButtonAndroid
            visible={searchContent}
            onPress={() => this.setState({ searchContent: "" })}
          />
        )}
        {Platform.OS === "ios" && (
          <SearchBackTextIos title="Zurück" onPress={this.clickBack} />
        )}
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
