import React from 'react';
import { styled } from '../../../styles';
import { faqData } from './data';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { SidebarParamList } from '../../../routes/Sidebar';
// eslint-disable-next-line import/named
import { MarkdownView } from 'react-native-markdown-view';
import { Linking, Platform } from 'react-native';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { linking } from '../../../lib/linking';
import SvgFacebook from '@democracy-deutschland/mobile-ui/src/components/Icons/Facebook';
import SvgTwitter from '@democracy-deutschland/mobile-ui/src/components/Icons/Twitter';
import SvgPlanet from '@democracy-deutschland/mobile-ui/src/components/Icons/Planet';
import SvgMail from '@democracy-deutschland/mobile-ui/src/components/Icons/Mail';
import SvgInstagram from '@democracy-deutschland/mobile-ui/src/components/Icons/Instagram';

const phoneNumber =
  Platform.OS === 'ios'
    ? `telprompt:${'+4917647040213'}`
    : `tel:${'+4917647040213'}`;
const email = `mailto:${'contact@democracy-deutschland.de'}`;
const github = 'https://github.com/demokratie-live/democracy-client/issues/';
const facebook = 'https://www.facebook.com/democracygermany/';
const twitter = 'https://twitter.com/democracy_de';
const instagram = 'https://www.instagram.com/democracy_deutschland/';
const youtube = 'https://www.youtube.com/channel/UC2R4cGTq1LjFZ2DvDaVhDyg';
const discord = 'https://discord.gg/Pdu3ZEV';
const website = 'https://www.democracy-deutschland.de/';

const Wrapper = styled.ScrollView``;

const Headline = styled.Text``;

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

const ContactIcons = styled.Text.attrs(() => ({
  size: 40,
  color: '#000000',
}))``;

const Markdown: React.FC = ({ children }) => (
  <MarkdownView
    onLinkPress={url => {
      Linking.openURL(url).catch(error =>
        console.warn('An error occurred: ', error),
      );
    }}>
    {children}
  </MarkdownView>
);

type FaqScreenNavigationProp = DrawerNavigationProp<SidebarParamList, 'Faq'>;

type Props = {
  navigation: FaqScreenNavigationProp;
};

export const FaqScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <Wrapper>
      <Headline>Hier beantworten wir häufig gestellte Fragen</Headline>
      {faqData.map(({ title, text }) => (
        <Folding title={title} key={title}>
          <Markdown>{text}</Markdown>
        </Folding>
      ))}
      <Button
        text="Tutorial erneut ansehen"
        onPress={() => navigation.navigate('Introduction')}
        backgroundColor="blue"
        textColor="white"
      />
      <Markdown>{`Ist noch etwas unklar? Der DEMOCRACY Support steht Dir bei Fragen zur Seite.

Du möchtest einen Fehler melden?

Bitte gib uns möglichst viele Informationen zu den von Dir gefunden Fehlern oder Verbesserungsvorschlägen.

Übermittele uns daher immer einen Screenshot, eine kurze Fehlerbeschreibung sowie Deine Plattform (iOS/Android) und Deine Gerätebezeichnung (z.B. iPhone SE), damit wir Dir schnellstmöglich helfen können. 
`}</Markdown>
      <ContactWrapper>
        <IconWrapper onPress={linking(phoneNumber)}>
          <ContactIcons>phone</ContactIcons>
        </IconWrapper>
        <IconWrapper onPress={linking(email)}>
          <SvgMail color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(website)}>
          <SvgPlanet color="#000" width={30} height={30} />
        </IconWrapper>
      </ContactWrapper>
      <SocialMediaWrapper>
        <IconWrapper onPress={linking(github)}>
          <ContactIcons>github</ContactIcons>
        </IconWrapper>
        <IconWrapper onPress={linking(twitter)}>
          <SvgTwitter color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(facebook)}>
          <SvgFacebook color="#000" width={30} height={30} />
        </IconWrapper>
      </SocialMediaWrapper>
      <SocialMediaWrapper>
        <IconWrapper onPress={linking(instagram)}>
          <SvgInstagram color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(youtube)}>
          <ContactIcons>youtube</ContactIcons>
        </IconWrapper>
        <IconWrapper onPress={linking(discord)}>
          <ContactIcons>discord</ContactIcons>
        </IconWrapper>
      </SocialMediaWrapper>
    </Wrapper>
  );
};
