import React, { Component } from "react";

export default function prevetNavStackDuplicate(ComposedComponent) {
  return class PreventNavStackDuplicate extends Component {
    componentDidMount() {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (event.id === "didDisappear") {
          this.navigated = null;
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
    }
  };
}
