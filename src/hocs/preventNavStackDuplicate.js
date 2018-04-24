import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

import onNavigationEvent from "../screens/onNavigationEvent";

export default function prevetNavStackDuplicate(ComposedComponent) {
  return class PreventNavStackDuplicate extends Component {
    static propTypes = {
      navigator: PropTypes.instanceOf(Navigator).isRequired
    };
    componentDidMount() {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (/* Platform.OS === "android" && */ event.id === "didDisappear") {
          this.navigated = null;
        } else {
          onNavigationEvent({ event, navigator: this.props.navigator });
        }
      });
    }

    navigated = null;

    navigateTo = screenOptions => {
      if (!this.navigated) {
        this.props.navigator.push(screenOptions);
      }

      this.navigated = true;
    };

    render() {
      return <ComposedComponent {...this.props} navigateTo={this.navigateTo} />;
    };
  };
}
