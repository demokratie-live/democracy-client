import React, { Component } from "react";
import PropTypes from "prop-types";
import { Linking } from "react-native";
import { Navigator } from "react-native-navigation";

export default ComposedComponent => {
  class WrappingComponent extends Component {
    constructor(props) {
      super(props);
      console.log("constructor", props);
    }
    componentDidMount() {
      console.log("componentDidMount");
      const { navigator } = this.props;
      navigator.setOnNavigatorEvent(event => {
        console.log(event);
        switch (event.type) {
          case "DeepLink":
            navigator.push({
              screen: event.link,
              passProps: { ...event.payload },
              backButtonTitle: ""
            });
            break;
          default:
            break;
        }
      }); // Does not work
      // Handle browser Links
      Linking.addEventListener("url", ({ url }) => {
        console.log("Linking.addEventListener", url);
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
