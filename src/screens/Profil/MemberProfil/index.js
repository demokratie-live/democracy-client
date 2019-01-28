import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 30;
  padding-horizontal: 18;
  align-items: center;
`;

const Text = styled.Text``;

class MemberProfil extends Component {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

    if (!props.noMenu) {
      const menuIcon = Platform.OS === 'ios' ? 'ios-menu' : 'md-menu';

      Ionicons.getImageSource(menuIcon, 24, '#FFFFFF').then(icon => {
        props.navigator.setButtons({
          leftButtons: [
            {
              icon,
              id: 'menu',
            },
          ],
        });
      });
    }
  }

  render() {
    return (
      <ScrollWrapper>
        <Wrapper>
          <Text>Member Profil</Text>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

MemberProfil.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  noMenu: PropTypes.bool,
};

MemberProfil.defaultProps = {
  noMenu: false,
};

export default MemberProfil;
