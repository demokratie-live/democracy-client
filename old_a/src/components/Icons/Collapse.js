import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = styled(Ionicons).attrs(() => ({
  color: 'rgb(151, 151, 151)',
  name: 'ios-arrow-up-outline',
  size: 20,
}))`
  transform: ${({ open }) => (open ? 'rotate(0deg)' : 'rotate(180deg)')};
`;

class CollapseIcon extends PureComponent {
  render() {
    return <Icon {...this.props} />;
  }
}

export default CollapseIcon;
