import { CompositeNavigationProp } from '@react-navigation/core';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import deepmerge from 'deepmerge';
import React from 'react';
import { Linking, Platform } from 'react-native';
import { MarkdownStyles, MarkdownView } from 'react-native-markdown-view';
import styled from 'styled-components/native';
import Folding from '../../components/Folding';
import SvgMail from '../../components/Icons/Mail';
import SvgPhone from '../../components/Icons/Phone';
import SvgPlanet from '../../components/Icons/Planet';
import { MadeWithLove } from '../../components/MadeWithLove';
import { Space } from '../../components/Space';
import { linking } from '../../lib/linking';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';
import { credentialsData } from './data';

const phoneNumber =
  Platform.OS === 'ios' ? `telprompt:${'+4917647040213'}` : `tel:${'+4917647040213'}`;
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
  max-width: 300px;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65px;
  height: 65px;
  border-width: 2px;
  border-radius: 33px;
  justify-content: center;
  align-items: center;
`;

interface MarkdownProps {
  styles?: MarkdownStyles;
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {} }) => {
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: '#555',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        ...(styles.paragraph || {}),
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    styles,
  );

  return (
    <MarkdownView
      styles={markdownStyles}
      onLinkPress={url => {
        Linking.openURL(url).catch(error => console.warn('An error occurred: ', error));
      }}
    >
      {children}
    </MarkdownView>
  );
};

type CredentialsScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'Credentials'>,
  NativeStackNavigationProp<RootStackParamList>
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
      <Space space={36} />
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
      <Space space={36} />
      <MadeWithLove />
    </Wrapper>
  );
};
