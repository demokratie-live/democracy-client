import SvgMail from '@democracy-deutschland/mobile-ui/src/components/Icons/Mail';
import SvgPlanet from '@democracy-deutschland/mobile-ui/src/components/Icons/Planet';
import Folding from '@democracy-deutschland/mobile-ui/src/components/shared/Folding';
import { CompositeNavigationProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { StackNavigationProp } from '@react-navigation/stack';
import deepmerge from 'deepmerge';
import React, { ComponentProps } from 'react';
import { Linking, Platform } from 'react-native';
import { MarkdownView } from 'react-native-markdown-view';
import styled from 'styled-components/native';
import { linking } from '../../../lib/linking';
import { RootStackParamList } from '../../../routes';
import { SidebarParamList } from '../../../routes/Sidebar';
import { credentialsData } from './data';
import SvgPhone from '@democracy-deutschland/mobile-ui/src/components/Icons/Phone';
import { MadeWithLove } from '../../../components/MadeWithLove';

const phoneNumber =
  Platform.OS === 'ios'
    ? `telprompt:${'+4917647040213'}`
    : `tel:${'+4917647040213'}`;
const email = `mailto:${'contact@democracy-deutschland.de'}`;
const website = 'https://www.democracy-deutschland.de/';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})``;

const ContactWrapper = styled.View`
  width: 100%;
  align-self: center;
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

const Spacer = styled.View`
  padding-bottom: 36;
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {} }) => {
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: '#555',
        ...(styles.paragraph || []),
      },
    },
    styles,
  );

  return (
    <MarkdownView
      styles={markdownStyles}
      onLinkPress={url => {
        Linking.openURL(url).catch(error =>
          console.warn('An error occurred: ', error),
        );
      }}>
      {children}
    </MarkdownView>
  );
};

type CredentialsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Credentials'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: CredentialsScreenNavigationProp;
};

export const CredentialsScreen: React.FC<Props> = () => {
  return (
    <Wrapper>
      {credentialsData.map(({ title, text, opened }) => (
        <Folding title={title} key={title} opened={opened}>
          <Markdown>{text}</Markdown>
        </Folding>
      ))}
      <Spacer />
      <ContactWrapper>
        <IconWrapper onPress={linking(phoneNumber)}>
          <SvgPhone color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(email)}>
          <SvgMail color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(website)}>
          <SvgPlanet color="#000" width={30} height={30} />
        </IconWrapper>
      </ContactWrapper>
      <Spacer />
      <MadeWithLove />
    </Wrapper>
  );
};
