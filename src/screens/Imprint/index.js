import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import {
  impressum1Head,
  impressum1Text,
  impressum2Head,
  impressum2Text,
  impressum3Head,
  impressum3Text,
  impressum4Head,
  impressum4Text,
  datenschutzSection,
  datenschutz1Head,
  datenschutz1Text,
  datenschutz2Head,
  datenschutz2Text,
  datenschutz3Head,
  datenschutz3Text,
  datenschutz4Head,
  datenschutz4Text1,
  datenschutz4Text2,
  datenschutz4Text3,
  datenschutz4Link,
  datenschutz5Head,
  datenschutz5Text,
  datenschutz6Head,
  datenschutz6Text,
  datenschutz7Head,
  datenschutz7Text,
  datenschutz8Head,
  datenschutz8Text,
  datenschutz9Head,
  datenschutz9Text,
  datenschutz10Head,
  datenschutz10Text1,
  datenschutz10Text2,
  datenschutz10Text3,
  datenschutz10Link,
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

const Section = styled.Text`
  font-weight: 600;
  font-size: 17;
  color: #8f8e94;
  padding-bottom: 3;
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

class Support extends Component {
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
          <Headline>{impressum1Head}</Headline>
          <Text>{impressum1Text}</Text>

          <Headline>{impressum2Head}</Headline>
          <Text>{impressum2Text}</Text>

          <Headline>{impressum3Head}</Headline>
          <Text>{impressum3Text}</Text>

          <Headline>{impressum4Head}</Headline>
          <Text>{impressum4Text}</Text>

          <Section>{datenschutzSection}</Section>
          <Headline>{datenschutz1Head}</Headline>
          <Text>{datenschutz1Text}</Text>

          <Headline>{datenschutz2Head}</Headline>
          <Text>{datenschutz2Text}</Text>

          <Headline>{datenschutz3Head}</Headline>
          <Text>{datenschutz3Text}</Text>

          <Headline>{datenschutz4Head}</Headline>
          <Text>
            <Text>{datenschutz4Text1}</Text>
            <TextLink onPress={linking(datenschutz4Link)}>{datenschutz4Text2}</TextLink>
            <Text>{datenschutz4Text3}</Text>
          </Text>

          <Headline>{datenschutz5Head}</Headline>
          <Text>{datenschutz5Text}</Text>

          <Headline>{datenschutz6Head}</Headline>
          <Text>{datenschutz6Text}</Text>

          <Headline>{datenschutz7Head}</Headline>
          <Text>{datenschutz7Text}</Text>

          {/* <Headline>{datenschutz8Head}</Headline>
          <Text>
            <Text>{datenschutz8Text1}</Text>
            <TextLink onPress={linking(datenschutz8Link)}>{datenschutz8Text2}</TextLink>
            <Text>{datenschutz8Text3}</Text>
          </Text> */}

          <Headline>{datenschutz8Head}</Headline>
          <Text>{datenschutz8Text}</Text>

          <Headline>{datenschutz9Head}</Headline>
          <Text>{datenschutz9Text}</Text>

          <Headline>{datenschutz10Head}</Headline>
          <Text>
            <Text>{datenschutz10Text1}</Text>
            <TextLink onPress={linking(datenschutz10Link)}>{datenschutz10Text2}</TextLink>
            <Text>{datenschutz10Text3}</Text>
          </Text>

          <Version>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Support;
