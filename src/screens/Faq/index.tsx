import React, { ComponentProps, PropsWithChildren } from "react";
import { faqData } from "./data";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { MarkdownView } from "react-native-markdown-view";
import { Linking, Platform } from "react-native";
import styled from "styled-components/native";
import deepmerge from "deepmerge";
import { CompositeNavigationProp } from "@react-navigation/core";
import { RootStackParamList } from "../../app/_layout";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Folding from "../../components/Folding";
import SvgDiscord from "../../components/Icons/Discord";
import SvgFacebook from "../../components/Icons/Facebook";
import SvgGithub from "../../components/Icons/Github";
import SvgInstagram from "../../components/Icons/Instagram";
import SvgMail from "../../components/Icons/Mail";
import SvgPhone from "../../components/Icons/Phone";
import SvgPlanet from "../../components/Icons/Planet";
import SvgTwitter from "../../components/Icons/Twitter";
import SvgYoutube from "../../components/Icons/Youtube";
import { MadeWithLove } from "../../components/MadeWithLove";
import { linking } from "../../lib/linking";
import { Button } from "@democracy-deutschland/ui";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SidebarParamList } from "../../app/(sidebar)/_layout";
import { router, useNavigation } from "expo-router";

const phoneNumber =
  Platform.OS === "ios"
    ? `telprompt:${"+4917647040213"}`
    : `tel:${"+4917647040213"}`;
const email = `mailto:${"contact@democracy-deutschland.de"}`;
const github = "https://github.com/demokratie-live/democracy-client/issues/";
const facebook = "https://www.facebook.com/democracygermany/";
const twitter = "https://twitter.com/democracy_de";
const instagram = "https://www.instagram.com/democracy_app/";
const youtube = "https://www.youtube.com/channel/UC2R4cGTq1LjFZ2DvDaVhDyg";
const discord = "https://discord.gg/Pdu3ZEV";
const website = "https://www.democracy-deutschland.de/";

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  /* padding-horizontal: 18px; */
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Headline = styled.Text`
  padding-horizontal: 18px;
  padding-vertical: 18px;
  color: grey;
  font-size: 15px;
`;

const ContactWrapper = styled.View`
  width: 100%;
  align-self: center;
  flex-direction: row;
  justify-content: space-between;
  max-width: 300px;
`;

const SocialMediaWrapper = styled.View`
  padding-top: 25px;
  align-self: center;
  width: 100%;
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

const Spacer = styled.View`
  padding-bottom: 18px;
`;

const ReViewTutorial = styled.View`
  margin-top: 36px;
  margin-bottom: 18px;
  margin-horizontal: 36px;
`;

interface MarkdownProps extends PropsWithChildren {
  styles?: ComponentProps<typeof MarkdownView>["styles"];
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {} }) => {
  const markdownStyles = deepmerge(
    {
      paragraph: {
        color: "#555",
        ...(styles.paragraph || []),
      },
    },
    styles
  );

  return (
    // @ts-ignore
    <MarkdownView
      style={{ paddingHorizontal: 18 }}
      styles={markdownStyles}
      onLinkPress={(url: string) => {
        Linking.openURL(url).catch((error) =>
          console.warn("An error occurred: ", error)
        );
      }}
    >
      {children}
    </MarkdownView>
  );
};

export const FaqScreen: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Wrapper>
      <Headline>Hier beantworten wir häufig gestellte Fragen</Headline>
      {faqData.map(({ title, text }) => (
        <Folding title={title} key={title}>
          <Markdown>{text}</Markdown>
        </Folding>
      ))}
      <Spacer />
      <Markdown
        styles={{
          paragraph: {
            fontSize: 15,
          },
        }}
      >{`Ist noch etwas unklar? Der DEMOCRACY Support steht Dir bei Fragen zur Seite.

Du möchtest einen Fehler melden?

Bitte gib uns möglichst viele Informationen zu den von Dir gefunden Fehlern oder Verbesserungsvorschlägen.

Übermittele uns daher immer einen Screenshot, eine kurze Fehlerbeschreibung sowie Deine Plattform (iOS/Android) und Deine Gerätebezeichnung (z.B. iPhone SE), damit wir Dir schnellstmöglich helfen können. 
`}</Markdown>
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
      <SocialMediaWrapper>
        <IconWrapper onPress={linking(github)}>
          <SvgGithub color="#000" width={30} height={30} />
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
          <SvgYoutube color="#000" width={30} height={30} />
        </IconWrapper>
        <IconWrapper onPress={linking(discord)}>
          <SvgDiscord color="#000" width={30} height={30} />
        </IconWrapper>
      </SocialMediaWrapper>
      <ReViewTutorial>
        <TouchableOpacity onPress={() => router.push("/Introduction")}>
          <Button variant="primary">Tutorial erneut ansehen</Button>
        </TouchableOpacity>
      </ReViewTutorial>
      <Spacer />
      <MadeWithLove />
    </Wrapper>
  );
};
