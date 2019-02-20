/* eslint-disable no-irregular-whitespace */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import {
  intro1a,
  intro1b,
  intro2,
  intro3,
  intro4,
  intro5a,
  intro5b,
  intro5bLink,
  intro5c,
  crowd,
  patenText,
  paten,
  outro1a,
  outro1b,
  outro1bLink,
  outro1c,
  outro2,
  outro3,
  outro4,
} from './content';
import MadeWithLove from '../../components/MadeWithLove';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-horizontal: 18;
  padding-vertical: 18;
  align-items: center;
`;

const Logo = styled.Image.attrs(() => ({
  source: require('../../../assets/images/logo-text10X.png'),
}))`
  margin-bottom: 18;
`;

const Text = styled.Text`
  color: #8f8e94;
  padding-top: 11;
  width: 100%;
  font-size: 15;
`;

const TextBold = styled.Text`
  color: #8f8e94;
  padding-top: 11;
  width: 100%;
  font-weight: bold;
  font-size: 15;
`;

const TextLink = styled.Text`
  color: rgb(68, 148, 211);
  padding-top: 11;
  width: 100%;
  text-decoration: underline;
  font-size: 15;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
`;

class Security extends PureComponent {
  static navigatorStyle = {
    navBarButtonColor: '#FFFFFF',
    navBarBackgroundColor: '#4494d3',
    navBarTextColor: '#FFFFFF',
    navBarTextFontSize: 17,
  };

  constructor(props) {
    super(props);

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

  render() {
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;
    return (
      <ScrollWrapper>
        <Wrapper>
          <Logo />
          <Text>
            <TextBold>{intro1a}</TextBold>
            <Text>{intro1b}</Text>
          </Text>
          <Text>{intro2}</Text>
          <Text>{intro3}</Text>
          <Text>{intro4}</Text>
          <Text>
            <Text>{intro5a}</Text>
            <TextLink onPress={() => Linking.openURL(intro5bLink)}>{intro5b}</TextLink>
            <Text>{intro5c}</Text>
          </Text>
          <Text>{crowd}</Text>
          <Text>{patenText}</Text>
          <Text>{paten}</Text>
          <Text>
            <Text>{outro1a}</Text>
            <TextLink onPress={() => Linking.openURL(outro1bLink)}>{outro1b}</TextLink>
            <Text>{outro1c}</Text>
          </Text>
          <Text>{outro2}</Text>
          <Text>{outro3}</Text>
          <Text>{outro4}</Text>

          <Version>{version}</Version>
        </Wrapper>
        <MadeWithLove />
      </ScrollWrapper>
    );
  }
}

Security.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Security;
