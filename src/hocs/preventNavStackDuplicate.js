import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { Navigator, Navigation } from "react-native-navigation";

export default function prevetNavStackDuplicate(ComposedComponent) {
  return class PreventNavStackDuplicate extends Component {
    static propTypes = {};

    lastScreen = "";

    componentDidMount() {
      Navigation.events().registerCommandListener((name, params) => {
        if (name === "push") {
          console.log(
            "DDBUG 8",
            name,
            params,
            params.layout.data.name,
            params.layout.data.passProps.procedureId
          );
          this.lastScreen = `${params.layout.data.name}-${
            params.layout.data.passProps.procedureId
          }`;
        }
      });
      // this.props.navigator.addOnNavigatorEvent(event => {
      //   if (event.id === "didDisappear") {
      //     this.navigated = null;
      //   }
      // });
    }

    navigated = null;

    navigateTo = screenOptions => {
      if (!this.navigated) {
        console.log("DDBUG 2", screenOptions);
        console.log("DDBUG lastScreen", this.lastScreen);
        console.log(
          "DDBUG lastScreen 2",
          `${screenOptions.screen}-${screenOptions.passProps.procedureId}`
        );

        if (
          this.lastScreen !==
          `${screenOptions.screen}-${screenOptions.passProps.procedureId}`
        )
          Navigation.push(this.props.componentId, {
            component: {
              ...screenOptions,
              name: screenOptions.screen
            }
          });
      }

      if (Platform.OS === "android") {
        // Delete this when react-native-navigation fires didDissapear #289
        this.navigated = true;
      }
    };

    render() {
      return <ComposedComponent {...this.props} navigateTo={this.navigateTo} />;
    }
  };
}
