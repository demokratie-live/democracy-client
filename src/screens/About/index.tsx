import deepmerge from "deepmerge";
import React, { ComponentProps, PropsWithChildren } from "react";
import { Linking, Platform, Text } from "react-native";
import { getBuildNumber, getVersion } from "react-native-device-info";
import { MarkdownView } from "react-native-markdown-view";
import styled from "styled-components/native";
import { AppLogo } from "../../components/AppLogo";
import Folding from "../../components/Folding";
import SvgMail from "../../components/Icons/Mail";
import SvgPhone from "../../components/Icons/Phone";
import SvgPlanet from "../../components/Icons/Planet";
import { MadeWithLove } from "../../components/MadeWithLove";
import { Space } from "../../components/Space";
import { linking } from "../../lib/linking";
import { credentialsData } from "./data";

const phoneNumber =
  Platform.OS === "ios"
    ? `telprompt:${"+4917647040213"}`
    : `tel:${"+4917647040213"}`;
const email = `mailto:${"contact@democracy-deutschland.de"}`;
const website = "https://www.democracy-deutschland.de/";

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})`
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const Content = styled.View`
  padding-horizontal: 18px;
`;

const HeaderWrapper = styled.View`
  padding-vertical: 18px;
  align-items: center;
`;

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

interface MarkdownProps extends PropsWithChildren {
  styles?: ComponentProps<typeof MarkdownView>["styles"];
  style?: ComponentProps<typeof MarkdownView>["style"];
}

const Markdown: React.FC<MarkdownProps> = ({
  children,
  styles = {},
  style = {},
}) => {
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
      styles={markdownStyles}
      style={style}
      onLinkPress={(url) => {
        Linking.openURL(url).catch((error) =>
          console.warn("An error occurred: ", error)
        );
      }}
    >
      {children}
    </MarkdownView>
  );
};

export const AboutScreen: React.FC = () => {
  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <AppLogo />
          <Text
            style={{
              paddingTop: 18,
            }}
          >
            Version {getVersion()} ({getBuildNumber()})
          </Text>
        </HeaderWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}
        >
          {
            "[DEMOCRACY Deutschland e.V.](https://www.democracy-deutschland.de) ist ein gemeinnütziger Verein, der sich mit seiner gleichnamigen App und Bildungsarbeit für Demokratie – als politische Selbstbestimmung durch die Bevölkerung – einsetzt."
          }
        </Markdown>

        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}
        >
          {`Unsere Arbeit ist und bleibt unabhängig, überparteilich, allgemeinnützig und nicht-kommerziell – von Menschen für Menschen.

Für mehr Informationen:
[democracy-deutschland.de](https://www.democracy-deutschland.de)
`}
        </Markdown>
        <Space space={18} />
      </Content>
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
