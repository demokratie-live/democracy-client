import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import deepmerge from 'deepmerge';
import React, { ComponentProps } from 'react';
import { Linking, Text } from 'react-native';
import { getBuildNumber, getVersion } from 'react-native-device-info';
import { MarkdownView } from 'react-native-markdown-view';
import styled from 'styled-components/native';
import SvgDemocracyBubble from '../../components/Icons/DemocracyBubble';
import { MadeWithLove } from '../../components/MadeWithLove';
import { Space } from '../../components/Space';
import { RootStackParamList } from '../../routes';
import { SidebarParamList } from '../../routes/Sidebar';

const Wrapper = styled.ScrollView.attrs({
  scrollIndicatorInsets: { right: 1 }, // TODO do cleanfix when there is a correct solution (already closed but not solved without workaround) https://github.com/facebook/react-native/issues/26610
})``;

const Content = styled.View`
  padding-horizontal: 18px;
`;

const HeaderWrapper = styled.View`
  padding-vertical: 18px;
  align-items: center;
`;

const QuotWrapper = styled.View`
  flex-direction: row;
`;

const Quot = styled.Text`
  font-size: 100px;
  color: #4494d3;
  top: -18px;
`;

interface MarkdownProps {
  styles?: ComponentProps<typeof MarkdownView>['styles'];
  style?: ComponentProps<typeof MarkdownView>['style'];
}

const Markdown: React.FC<MarkdownProps> = ({ children, styles = {}, style = {} }) => {
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
      style={style}
      onLinkPress={url => {
        Linking.openURL(url).catch(error => console.warn('An error occurred: ', error));
      }}
    >
      {children}
    </MarkdownView>
  );
};

// type AboutScreenNavigationProp = DrawerNavigationProp<SidebarParamList, 'About'>;
type AboutScreenNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<SidebarParamList, 'About'>,
  NativeStackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: AboutScreenNavigationProp;
};

export const AboutScreen: React.FC<Props> = () => {
  return (
    <Wrapper>
      <Content>
        <HeaderWrapper>
          <SvgDemocracyBubble width="125" height="125" color="#000" />
          <Text
            style={{
              paddingTop: 18,
            }}
          >
            Version {getVersion()} ({getBuildNumber()})
          </Text>
          <Text>Made with ❤ by DEMOCRACY Deutschland e.V.</Text>
        </HeaderWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}
        >
          {`[DEMOCRACY Deutschland e.V.](https://www.democracy-deutschland.de) ist ein gemeinnütziger Verein, der mit seiner gleichnamigen App _DEMOCRACY_ Demokratie direkter und repräsentativer machen will. 

Als crowd-finanzierte und politisch unabhängige Plattform informiert die App über die aktuellen Bundestagsabstimmungen und ermöglicht den Nutzern eine eigene direkte Abstimmung.        
`}
        </Markdown>
        <QuotWrapper>
          <Quot>❝</Quot>
          <Markdown
            style={{
              paddingRight: 100,
            }}
            styles={{
              paragraph: {
                fontSize: 15,
              },
            }}
          >
            {`Mit DEMOCRACY wollen wir eine öffentliche Infrastruktur zur Verfügung stellen, die das Funktionieren einer lebendigen Demokratie begünstigt.

Der Weisheit letzter Schluss liegt für uns in der solidarischen Kooperation (Gemeinschaftlichkeit) zum Vorteil aller (Gemeinnützigkeit). 

Deshalb ist es für uns selbstverständlich, nicht nur alle Abstimmungsergebnisse anonymisiert, sondern auch unseren Source-Code offen zu legen (Transparenz). 

Und weil Profitinteressen die Idee nur korrumpieren würden, haben wir uns auch äußerlich eine Rechtsform gegeben, die eine Verfremdung oder Bereicherungsabsicht per Satzung für immer ausschließt. 

DEMOCRACY ist und bleibt spendenfinanziert. 

Alle entstehenden Nutzerdaten sind gerade keine handelbaren Wirtschaftsgüter, sondern im Sinne des Grundgesetzes zu schützen. Datenverkauf und Werbefinanzierung finden bei unserem Vorhaben keinen Platz.

_Marius Krüger im September 2017_
`}
          </Markdown>
        </QuotWrapper>
        <Markdown
          styles={{
            paragraph: {
              fontSize: 15,
            },
          }}
        >
          {`Nach wie vor gilt unser größter Dank den 542 Unterstützerinnen und Unterstützern unserer initialen [Crowdfunding-Kampagne](https://www.startnext.com/democracy), ohne die es nicht möglich gewesen wäre, DEMOCRACY überhaupt umzusetzen.

Neben den initialen Projektunterstützungen ziehen wir unseren Hut vor den zahlreichen [Paten und Patinnen](https://www.democracy-deutschland.de/#!donate), die mit ihrer regelmäßigen Spende mithelfen, die kühne Vision einer unabhängigen und nachhaltigen Crowdfinanzierung von DEMOCRACY bereits jetzt zu realisieren.
 
Unsere Arbeit ist und bleibt unabhängig, überparteilich, allgemeinnützig und nicht-kommerziell – von Menschen für Menschen.

Für mehr Informationen:
[democracy-deutschland.de](https://www.democracy-deutschland.de)
`}
        </Markdown>
        <Space space={18} />
      </Content>
      <MadeWithLove />
    </Wrapper>
  );
};
