import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';

// import onNavigationEvent from "../screens/onNavigationEvent";

export default ComposedComponent => {
  class WrappingComponent extends Component {
    componentDidMount() {
      const { navigator } = this.props;
      navigator.addOnNavigatorEvent(event => {
        if (event.type) {
          // NavBar Events
          switch (event.id) {
            case 'menu':
              navigator.toggleDrawer({ side: 'left' });
              break;
            case 'closeModal':
              navigator.dismissModal();
              break;
            case 'search':
              navigator.push({
                screen: 'democracy.Search',
                backButtonHidden: true,
              });
              break;
            case 'filter':
              this.props.navigator.showModal({
                screen: 'democracy.VoteList.Filter',
              });
              break;

            default:
              break;
          }
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
