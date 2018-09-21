import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import Segment from '../Detail/Segment';

import {
  faq1Title,
  faq1Answer,
  faq2Title,
  faq2Answer,
  faq3Title,
  faq3Answer,
  faq4Title,
  faq4Section1,
  faq4Answer1,
  faq4Section2,
  faq4Answer2,
  faq4Section3,
  faq4Answer3,
  faq4Section4,
  faq4Answer4,
  faq4Section5,
  faq4Answer5,
  faq4Section6,
  faq4Answer6,
  faq4Section7,
  faq4Answer7,
  faq4Section8,
  faq4Answer8,
  faq4Section9,
  faq4Answer9,
  faq4Section10,
  faq4Answer10,
  faq4Outro1,
  faq4Outro2,
  faq4Link1,
  faq5Title,
  faq5Answer1,
  faq5Answer2,
  faq5Answer3,
  faq5Answer4,
  faq5Link1,
  faq5Answer5,
  faq5Answer6,
  faq5Link2,
  faq6Title,
  faq6Answer1,
  faq6Answer2,
  faq6Link1,
  faq7Title,
  faq7Answer1,
  faq7Answer2,
  faq7Link1,
  faq7Answer3,
  faq8Title,
  faq8Answer,
  faq9Title,
  faq9Answer1,
  faq9Answer2,
  faq9Link1,
  faq9Answer3,
  faq10Title,
  faq10Intro,
  faq10Section1,
  faq10Answer10,
  faq10Answer11,
  faq10Link10,
  faq10Answer12,
  faq10Answer13,
  faq10Link11,
  faq10Answer14,
  faq10Answer15,
  faq10Link12,
  faq10Section2,
  faq10Answer20,
  faq10Section3,
  faq10Answer30,
  faq10Answer31,
  faq10Link30,
  faq10Answer32,
  faq10Answer33,
  faq10Link31,
  faq10Answer34,
  faq10Answer35,
  faq10Link32,
  faq10Answer36,
  faq10Outro1,
  faq10Outro2,
  faq10LinkO1,
} from './content';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
  text-align: center;
`;

const Section = styled.Text`
  font-weight: 600;
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 3;
`;

const TextLink = styled.Text`
  font-size: 15;
  padding-bottom: 8;
  color: rgb(68, 148, 211);
  text-decoration: underline;
`;

const TextBold = styled.Text`
  font-weight: 600;
  font-size: 15;
  color: #8f8e94;
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
        <Segment title={faq1Title}>
          <Text>{faq1Answer}</Text>
        </Segment>
        <Segment title={faq2Title}>
          <Text>{faq2Answer}</Text>
        </Segment>
        <Segment title={faq3Title}>
          <Text>{faq3Answer}</Text>
        </Segment>
        <Segment title={faq4Title}>
          <Text>
            <Section>{faq4Section1}</Section>
            <Text>{faq4Answer1}</Text>
            <Section>{faq4Section2}</Section>
            <Text>{faq4Answer2}</Text>
            <Section>{faq4Section3}</Section>
            <Text>{faq4Answer3}</Text>
            <Section>{faq4Section4}</Section>
            <Text>{faq4Answer4}</Text>
            <Section>{faq4Section5}</Section>
            <Text>{faq4Answer5}</Text>
            <Section>{faq4Section6}</Section>
            <Text>{faq4Answer6}</Text>
            <Section>{faq4Section7}</Section>
            <Text>{faq4Answer7}</Text>
            <Section>{faq4Section8}</Section>
            <Text>{faq4Answer8}</Text>
            <Section>{faq4Section9}</Section>
            <Text>{faq4Answer9}</Text>
            <Section>{faq4Section10}</Section>
            <Text>{faq4Answer10}</Text>

            <Text>{faq4Outro1}</Text>
            <TextLink onPress={linking(faq4Link1)}>{faq4Outro2}</TextLink>
          </Text>
        </Segment>
        <Segment title={faq5Title}>
          <Text>
            <Text>{faq5Answer1}</Text>
            <TextBold>{faq5Answer2}</TextBold>
            <Text>{faq5Answer3}</Text>
            <TextLink onPress={linking(faq5Link1)}>{faq5Answer4}</TextLink>
            <Text>{faq5Answer5}</Text>
            <TextLink onPress={linking(faq5Link2)}>{faq5Answer6}</TextLink>
          </Text>
        </Segment>
        <Segment title={faq6Title}>
          <Text>
            <Text>{faq6Answer1}</Text>
            <TextLink onPress={linking(faq6Link1)}>{faq6Answer2}</TextLink>
          </Text>
        </Segment>
        <Segment title={faq7Title}>
          <Text>
            <Text>{faq7Answer1}</Text>
            <TextLink onPress={linking(faq7Link1)}>{faq7Answer2}</TextLink>
            <Text>{faq7Answer3}</Text>
          </Text>
        </Segment>
        <Segment title={faq8Title}>
          <Text>{faq8Answer}</Text>
        </Segment>
        <Segment title={faq9Title}>
          <Text>
            <Text>{faq9Answer1}</Text>
            <TextLink onPress={linking(faq9Link1)}>{faq9Answer2}</TextLink>
            <Text>{faq9Answer3}</Text>
          </Text>
        </Segment>
        <Segment title={faq10Title}>
          <Text>
            <Text>{faq10Intro}</Text>
            <Section>{faq10Section1}</Section>
            <Text>{faq10Answer10}</Text>
            <TextLink onPress={linking(faq10Link10)}>{faq10Answer11}</TextLink>
            <Text>{faq10Answer12}</Text>
            <TextLink onPress={linking(faq10Link11)}>{faq10Answer13}</TextLink>
            <Text>{faq10Answer14}</Text>
            <TextLink onPress={linking(faq10Link12)}>{faq10Answer15}</TextLink>
            <Section>{faq10Section2}</Section>
            <Text>{faq10Answer20}</Text>
            <Section>{faq10Section3}</Section>
            <Text>{faq10Answer30}</Text>
            <TextLink onPress={linking(faq10Link30)}>{faq10Answer31}</TextLink>
            <Text>{faq10Answer32}</Text>
            <TextLink onPress={linking(faq10Link31)}>{faq10Answer33}</TextLink>
            <Text>{faq10Answer34}</Text>
            <TextLink onPress={linking(faq10Link32)}>{faq10Answer35}</TextLink>
            <Text>{faq10Answer36}</Text>

            <Text>{faq10Outro1}</Text>
            <TextLink onPress={linking(faq10LinkO1)}>{faq10Outro2}</TextLink>
          </Text>
        </Segment>

        <Version>{version}</Version>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Support;
