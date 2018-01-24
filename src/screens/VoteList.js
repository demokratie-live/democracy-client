// @flow

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { graphql } from "react-apollo";
import PropTypes from "prop-types";
import SET_INSTRUCTIONS_SHOWN from "../graphql/mutations/setInstructinosShown";

const instructions = Platform.select({
  ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
  android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`
});

class VoteList extends Component {
  static navigatorStyle = {
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17,
    navBarTextFontFamily: "SFUIText-Semibold"
  };

  showIntroAgain = () => {
    const { setInstructionsShown } = this.props;
    setInstructionsShown({
      variables: {
        isInstructionsShown: false
      }
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <Button
          onPress={this.showIntroAgain}
          title="Intro nochmal zeigen"
          accessibilityLabel="Intro nochmal zeigen"
        />
      </View>
    );
  }
}

VoteList.propTypes = {
  setInstructionsShown: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

export default graphql(SET_INSTRUCTIONS_SHOWN, {
  name: "setInstructionsShown"
})(VoteList);
