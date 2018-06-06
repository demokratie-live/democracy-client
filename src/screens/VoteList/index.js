import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Navigation, Navigator } from "react-native-navigation";
import TopBarNav from "top-bar-nav";

import List from "./List";
import Header from "./Header";

Navigation.registerComponent("democracy.VoteList.Header", () => Header);

const Screen = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

class VoteList extends Component {
  static navigatorStyle = {
    navBarNoBorder: true,
    navBarButtonColor: "#FFFFFF",
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17,
    selectedTopTabTextColor: "#ffffff",
    selectedTopTabIndicatorColor: "#ffffff",
    selectedTopTabIndicatorHeight: 5
  };

  lists = [
    { key: "VOTING", title: "in Abstimmung", smallTitle: "Abstimmung" },
    {
      key: "PREPARATION",
      title: "in Vorbereitung",
      smallTitle: "Vorbereitung"
    },
    { key: "HOT", title: "What's hot?", smallTitle: "What's hot?" }
  ];

  render() {
    return (
      <Screen>
        <TopBarNav
          routeStack={[
            { label: "in Abstimmung", title: "Scene" },
            { label: "in Vorbereitung", title: "Scene" },
            { label: "What's hot?", title: "Scene" }
          ]}
          renderScene={(route, i) => (
            // This is a lot like the now deprecated Navigator component
            <List
              List
              key={this.lists[i].key}
              listType={this.lists[i].key}
              navigator={this.props.navigator}
              index={i}
            />
          )}
          headerStyle={{
            backgroundColor: "#4494d3"
          }}
          labelStyle={{
            fontSize: 15,
            color: "#fff"
          }}
          underlineStyle={{
            backgroundColor: "#fff",
            height: 2
          }}
        />
      </Screen>
    );
  }
}

VoteList.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

VoteList.defaultProps = {};

export default VoteList;
