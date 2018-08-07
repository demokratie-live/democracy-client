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
          if (params.layout.data.passProps) {
            this.lastScreenlastScreen = `${params.layout.data.name}-${
              params.layout.data.passProps.procedureId
            }`;
          } else {
            this.lastScreenlastScreen = `${params.layout.data.name}`;
          }
        }
      });
    }

    navigated = null;

    navigateTo = screenOptions => {
      if (
        this.lastScreen !==
        `${screenOptions.screen}-${screenOptions.passProps.procedureId}`
      ) {
        Navigation.push(this.props.componentId, {
          component: {
            ...screenOptions,
            name: screenOptions.screen
          }
        });
      }
    };

    render() {
      return <ComposedComponent {...this.props} navigateTo={this.navigateTo} />;
    }
  };
}
