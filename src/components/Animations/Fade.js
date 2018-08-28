import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

class Fade extends Component {
  state = {
    fadeAnim: new Animated.Value(1),
  };

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    const { duration } = this.props;
    if (this.props.visible !== visible) {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: visible ? 1 : 0, // Animate to opacity: 1 (opaque)
          duration, // Make it take a while
        },
      ).start();
    }
  }

  render() {
    const { fadeAnim } = this.state;
    const { children } = this.props;
    return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
  }
}

Fade.propTypes = {
  visible: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Fade.defaultProps = {
  duration: 500,
};

export default Fade;
