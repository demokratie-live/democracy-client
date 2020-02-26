import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Navigator } from 'react-native-navigation';

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  margin-right: ${Platform.OS === 'ios' ? 2 : 16};
  margin-left: ${Platform.OS === 'ios' ? 2 : 0};
`;

const Title = styled.Text`
  flex: 1;
  text-align: ${Platform.OS === 'ios' ? 'center' : 'left'};
  padding-left: ${Platform.OS === 'ios' ? 0 : 32};
  font-size: 17;
  color: #fff;
  font-weight: 600;
`;

const Icons = styled(Ionicons.Button).attrs(() => ({
  color: '#fff',
  size: 25,
  backgroundColor: 'transparent',
  iconStyle: { marginRight: 0 },
}))`
  padding: 0;
`;

const SearchIcon = styled(Icons).attrs(() => ({
  name: Platform.OS === 'ios' ? 'ios-search' : 'md-search',
}))``;

const FilterIcon = styled(Icons).attrs(() => ({
  name: 'ios-funnel-outline',
}))``;

const MenuIcon = styled(Icons).attrs(() => ({
  name: Platform.OS === 'ios' ? 'ios-menu' : 'md-menu',
}))``;

class Header extends PureComponent {
  clickSearchIcon = () => {
    const { navigator } = this.props;
    navigator.push({
      screen: 'democracy.Search',
      backButtonHidden: true,
      animationType: 'none',
    });
  };

  clickBurgerIcon = () => {
    const { navigator } = this.props;
    navigator.toggleDrawer({ side: 'left' });
  };

  render() {
    const { title } = this.props;

    return (
      <Wrapper>
        <MenuIcon onPress={this.clickBurgerIcon} />
        <Title>{title.toUpperCase()}</Title>
        <FilterIcon />
        <SearchIcon onPress={this.clickSearchIcon} />
      </Wrapper>
    );
  }
}
Header.propTypes = {
  title: PropTypes.string,
  navigator: PropTypes.instanceOf(Navigator),
};

Header.defaultProps = {
  title: '',
  navigator: undefined,
};

export default Header;
