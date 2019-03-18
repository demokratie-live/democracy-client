import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  background-color: #fff;
  height: 44;
  align-items: center;
  padding-left: 16;
  border-bottom-width: 1;
  border-bottom-color: #c8c7cc;
  font-size: 17;
`;

const Text = styled.Text`
  font-size: 17;
  margin-right: auto;
`;

const Value = styled.Text`
  font-size: 17;
  color: #8f8e94;
  padding-right: ${({ arrow }) => (arrow ? 5 : 12)};
`;

const NavigationIoniconsIcon = styled(Ionicons).attrs(() => ({
  size: 24,
  color: 'grey',
}))`
  text-align: center;
  width: 24;
  padding-right: 10;
  margin-top: 3;
`;

class ListItem extends PureComponent {
  render() {
    const { children, text, arrow, onPress } = this.props;
    return (
      <Wrapper onPress={onPress}>
        <Text>{children}</Text>
        {text && <Value arrow={arrow}>{text}</Value>}
        {arrow && <NavigationIoniconsIcon name="ios-arrow-forward" />}
      </Wrapper>
    );
  }
}

ListItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  arrow: PropTypes.bool,
  onPress: PropTypes.func,
};

ListItem.defaultProps = {
  text: false,
  arrow: false,
  onPress: () => {},
};

export default ListItem;
