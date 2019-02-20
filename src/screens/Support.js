import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

import Config from '../config';

// Components
import MadeWithLove from '../components/MadeWithLove';

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

const Logo = styled.Image.attrs(() => ({
  source: require('../../assets/images/logo-text10X.png'),
}))``;

const Text = styled.Text`
  font-size: 15;
  color: #6d6d72;
  padding-vertical: 28;
`;

const ContactWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300;
`;

const SocialMediaWrapper = styled.View`
  padding-top: 25;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 18;
`;

const ContactIcons = styled(FontAwesome).attrs(() => ({
  size: 40,
  color: '#000000',
}))``;

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

  linking = url => () => {
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

  render() {
    const phoneNumber =
      Platform.OS === 'ios' ? `telprompt:${Config.PHONE_NUMBER}` : `tel:${Config.PHONE_NUMBER}`;
    const email = `mailto:${Config.CONTACT_EMAIL}`;
    const github = Config.GITHUB_URL;
    const facebook = Config.FACEBOOK_URL;
    const twitter = Config.TWITTER_URL;
    const instagram = Config.INSTAGRAM_URL;
    const youtube = Config.YOUTUBE_URL;
    const discord = Config.DISCORD_URL;
    const website = Config.WEBSITE_URL;

    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;

    return (
      <ScrollWrapper>
        <Wrapper>
          <Logo />
          <Text>
            {`Ist etwas unklar? Du möchtest bei Problemen unterstützt werden? Der DEMOCRACY Support steht Dir bei Fragen zur Seite.

Um Fehler zu beheben, ist allerdings ein qualifiziertes Feedback notwendig. Deshalb gib uns möglichst viele Informationen zu den von Dir gefundenen Fehlern oder Verbesserungsvorschlägen.

Übermittle uns daher immer einen Screenshot, eine kurze Fehlerbeschreibung sowie Deine Plattform (iOS/Android) und Deine Gerätebezeichnung (z.B. iPhone SE), damit wir Dir schnellstmöglich helfen können. `}
          </Text>
          <ContactWrapper>
            <IconWrapper onPress={this.linking(phoneNumber)}>
              <ContactIcons name="phone" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(email)}>
              <ContactIcons name="envelope" size={30} />
            </IconWrapper>
            <IconWrapper onPress={this.linking(website)}>
              <ContactIcons name="globe" />
            </IconWrapper>
          </ContactWrapper>
          <SocialMediaWrapper>
            <IconWrapper onPress={this.linking(github)}>
              <ContactIcons name="github" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(twitter)}>
              <ContactIcons name="twitter" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(facebook)}>
              <ContactIcons name="facebook" />
            </IconWrapper>
          </SocialMediaWrapper>
          <SocialMediaWrapper>
            <IconWrapper onPress={this.linking(instagram)}>
              <ContactIcons name="instagram" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(youtube)}>
              <ContactIcons name="youtube" />
            </IconWrapper>
            <IconWrapper onPress={this.linking(discord)}>
              <ContactIcons name="weixin" />
            </IconWrapper>
          </SocialMediaWrapper>
          <Version>{version}</Version>
        </Wrapper>
        <MadeWithLove />
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Support;
