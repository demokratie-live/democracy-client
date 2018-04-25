import React, { Component } from "react";
import PropTypes from "prop-types";
import { Linking } from "react-native";
import { Navigator } from "react-native-navigation";

import onNavigationEvent from "../onNavigationEvent";

export default ComposedComponent => {
  class WrappingComponent extends Component {
    componentDidMount() {
      const { navigator } = this.props;
      navigator.setOnNavigatorEvent(event => {
        switch (event.type) {
          case "DeepLink":
            navigator.push({
              screen: event.link,
              passProps: { ...event.payload },
              backButtonTitle: ""
            });
            break;
          default:
            onNavigationEvent({ event, navigator });
            break;
        }
      }); // Does not work
      // Handle browser Links
      Linking.addEventListener("url", ({ url }) => {
        const params = url.substr(url.indexOf("//") + 2).split("/");
        let link;
        let payload;
        switch (params[0]) {
          case "procedure":
            link = `democracy.Detail`;
            payload = { procedureId: params[1] };
            break;
          default:
            break;
        }
        if (link) {
          this.props.navigator.handleDeepLink({
            link: `democracy.Detail`,
            payload
          });
        }
      });
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
