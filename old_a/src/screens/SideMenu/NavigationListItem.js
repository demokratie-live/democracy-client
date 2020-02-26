import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const NavigationItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({ active }) => (active ? 'rgba(68, 148, 211, 0.5)' : 'transparent')};
  height: 44;
  padding-left: 19;
`;

const NavigationTitle = styled.Text`
  padding-left: 17;
  font-size: 17;
  color: #fff;
`;

class NavigationListItem extends Component {
  shouldComponentUpdate(p) {
    const { currentScreen } = this.props;
    if (currentScreen === p.currentScreen) {
      return false;
    }
    return true;
  }

  render() {
    const { title, icon, currentScreen, screenId, navigateTo } = this.props;
    return (
      <NavigationItem
        active={currentScreen === screenId}
        onPress={() => navigateTo({ screenId, title })}
      >
        {icon}

        <NavigationTitle>{title}</NavigationTitle>
      </NavigationItem>
    );
  }
}

NavigationListItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  screenId: PropTypes.string,
  currentScreen: PropTypes.string.isRequired,
  navigateTo: PropTypes.func.isRequired,
};

NavigationListItem.defaultProps = {
  // active: false,
  screenId: '',
};

export default NavigationListItem;
