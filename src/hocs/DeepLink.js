import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// import onNavigationEvent from "../screens/onNavigationEvent";

let LISTENERS_ADDED = false;

export default ComposedComponent => {
  class WrappingComponent extends Component {
    componentDidMount() {
      const { navigator } = this.props;
      if (!LISTENERS_ADDED) {
        LISTENERS_ADDED = true;
        navigator.addOnNavigatorEvent(event => {
          switch (event.type) {
            case 'DeepLink':
              switch (event.payload.from) {
                // Push Notification & Browser Links
                case 'externalLink':
                case 'pushNotification':
                  navigator.push({
                    screen: event.link,
                    passProps: { ...event.payload },
                    backButtonTitle: '',
                    title: 'Abstimmung'.toUpperCase(),
                  });
                  break;

                default:
                  break;
              }

              break;

            default:
              break;
          }
        });
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  WrappingComponent.propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired,
  };

  return WrappingComponent;
};
