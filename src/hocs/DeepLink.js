import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";

// import onNavigationEvent from "../screens/onNavigationEvent";

export default ComposedComponent => {
  class WrappingComponent extends Component {
    componentDidMount() {
      const { navigator } = this.props;
      navigator.addOnNavigatorEvent(event => {
        switch (event.type) {
          case "DeepLink":
            switch (event.payload.from) {
              // Side Menu Events

              // Push Notification & Browser Links
              case "externalLink":
                navigator.push({
                  screen: event.link,
                  passProps: { ...event.payload },
                  backButtonTitle: ""
                });
                break;

              default:
                break;
            }

            break;

          default:
            break;
        }

        switch (event.type) {
          case "DeepLink":
            switch (event.payload.from) {
              default:
                break;
            }
            break;
          default:
            // onNavigationEvent({ event, navigator });
            break;
        }
      }); // Does not work
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  WrappingComponent.propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired
  };

  return WrappingComponent;
};
