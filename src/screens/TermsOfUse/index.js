import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import {
  termsIntroText,
  terms1Head,
  terms1Text,
  terms2Head,
  terms2Text,
  terms3Head,
  terms3Text,
  terms4Head,
  terms4Text,
  terms5Head,
  terms5Text,
  terms6Head,
  terms6Text,
  terms7Head,
  terms7Text,
  terms8Head,
  terms8Text1,
  terms8Text2,
  terms8Text3,
  terms8Link1,
  terms9Head,
  terms9Text1,
  terms9Text2,
  terms9Text3,
  terms9Link1,
  terms10Head,
  terms10Text1,
  terms10Text2,
  terms10Text3,
  terms10Link1,
  terms11Head,
  terms11Text1,
  terms11Text2,
  terms11Link1,
} from './content';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 30;
  padding-horizontal: 18;
`;

const Headline = styled.Text`
  font-weight: 600;
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 3;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 8;
`;

const TextLink = styled.Text`
  font-size: 15;
  padding-bottom: 8;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
  text-align: center;
`;

class TermsOfUse extends PureComponent {
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
    const linking = url => () => {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url).catch(() => null);
        } else {
          Alert.alert(
            'Nicht unterstützt',
            'Diese Operation wird auf Deinem Gerät zurzeit nicht unterstützt!',
            [{ text: 'OK' }],
            { cancelable: false },
          );
        }
      });
    };
    return (
      <ScrollWrapper>
        <Wrapper>
          <Text>{termsIntroText}</Text>

          <Headline>{terms1Head}</Headline>
          <Text>{terms1Text}</Text>

          <Headline>{terms2Head}</Headline>
          <Text>{terms2Text}</Text>

          <Headline>{terms3Head}</Headline>
          <Text>{terms3Text}</Text>

          <Headline>{terms4Head}</Headline>
          <Text>{terms4Text}</Text>

          <Headline>{terms5Head}</Headline>
          <Text>{terms5Text}</Text>

          <Headline>{terms6Head}</Headline>
          <Text>{terms6Text}</Text>

          <Headline>{terms7Head}</Headline>
          <Text>{terms7Text}</Text>

          <Headline>{terms8Head}</Headline>
          <Text>
            <Text>{terms8Text1}</Text>
            <TextLink onPress={linking(terms8Link1)}>{terms8Text2}</TextLink>
            <Text>{terms8Text3}</Text>
          </Text>

          <Headline>{terms9Head}</Headline>
          <Text>
            <Text>{terms9Text1}</Text>
            <TextLink onPress={linking(terms9Link1)}>{terms9Text2}</TextLink>
            <Text>{terms9Text3}</Text>
          </Text>

          <Headline>{terms10Head}</Headline>
          <Text>
            <Text>{terms10Text1}</Text>
            <TextLink onPress={linking(terms10Link1)}>{terms10Text2}</TextLink>
            <Text>{terms10Text3}</Text>
          </Text>

          <Headline>{terms11Head}</Headline>
          <Text>
            <Text>{terms11Text1}</Text>
            <TextLink onPress={linking(terms11Link1)}>{terms11Text2}</TextLink>
          </Text>

          <Version>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

TermsOfUse.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default TermsOfUse;
