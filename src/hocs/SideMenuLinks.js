import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// import onNavigationEvent from "../screens/onNavigationEvent";

import topTabs from '../screens/VoteList/topTabs';

let currentScreen;

export default ComposedComponent => {
  class WrappingComponent extends PureComponent {
    componentDidMount() {
      const { navigator } = this.props;
      navigator.addOnNavigatorEvent(event => {
        if (event.type === 'DeepLink' && event.payload.from === 'sideMenu') {
          if (event.link !== currentScreen) {
            if (event.link === 'democracy.VoteList') {
              navigator.resetTo({
                screen: event.link,
                title: event.payload.title,
                topTabs,
                animated: false,
              });
            } else {
              navigator.push({
                screen: event.link,
                title: event.payload.title,
                animated: false,
                backButtonHidden: true,
              });
            }
          }
          currentScreen = event.link;
        }
      }); // Does not work
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
