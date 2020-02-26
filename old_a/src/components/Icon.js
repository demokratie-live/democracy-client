import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Icon = styled(Ionicons).attrs(({ name }) => ({
  size: 28,
  //   name: Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share',
  name,
  color: 'rgb(0, 0, 0)',
}))``;

class IconCmp extends PureComponent {
  render() {
    return <Icon {...this.props} />;
  }
}

export default IconCmp;
