import React, { Component } from "react";
import { Platform } from "react-native";
import styled from "styled-components/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${Platform.OS === "ios" ? 0 : 16};
`;

const Title = styled.Text`
  flex: 1;
  text-align: ${Platform.OS === "ios" ? "center" : "left"};
  padding-left: ${Platform.OS === "ios" ? 0 : 32};
  font-size: 17;
  color: #fff;
  font-weight: 600;
`;

const Icons = styled(Ionicons.Button).attrs({
  color: "#fff",
  size: 30,
  backgroundColor: "transparent"
})``;

const SearchIcon = styled(Icons).attrs({
  name: Platform.OS === "ios" ? "ios-search" : "md-search"
})``;

const MenuIcon = styled(Icons).attrs({
  name: Platform.OS === "ios" ? "ios-menu" : "md-menu"
})``;

const SearchInput = styled.TextInput.attrs({
  clearButtonMode: "always",
  autoFocus: true,
  placeholderTextColor:
    Platform.OS === "ios" ? "#7a797b" : "rgba(255, 255, 255, 0.38)",
  underlineColorAndroid: "transparent",
  selectionColor: Platform.OS === "ios" ? "#000" : "#fff"
})`
  flex: 1;
  background-color: ${Platform.OS === "ios"
    ? "rgba(255, 255, 255, 0.8)"
    : "transparent"};
  border-radius: 5.5;
  font-size: ${Platform.OS === "ios" ? 14 : 20};
  height: ${Platform.OS === "ios" ? 28 : "auto"};
  padding-horizontal: ${Platform.OS === "ios" ? 6 : 0};
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
    searchActive: false,
    searchContent: ""
  };

  render() {
    const { searchActive, searchContent } = this.state;
    const { title } = this.props;
    if (!searchActive) {
      return (
        <Wrapper>
          <MenuIcon />
          <Title>{title.toUpperCase()}</Title>
          <SearchIcon onPress={() => this.setState({ searchActive: true })} />
        </Wrapper>
      );
    }
    return (
      <Wrapper>
        {Platform.OS === "android" && (
          <SearchBackButtonAndroid
            onPress={() =>
              this.setState({ searchActive: false, searchContent: "" })
            }
          />
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
          <SearchBackTextIos
            title="Zurück"
            onPress={() =>
              this.setState({ searchActive: false, searchContent: "" })
            }
          />
        )}
      </Wrapper>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: ""
};

export default Header;
