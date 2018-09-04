import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import Segment from '../Detail/Segment';
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import EntryHeader from './EntryHeader';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 18;
  padding-horizontal: 18;
`;

const Headline = styled.Text`
  font-weight: bold;
  font-size: 15;
  color: #8f8e94;
  padding-bottom: 6;
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

const DefinitionListWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 3;
`;

const DefinitionListTitle = styled.Text`
  width: 30%;
`;

const DefinitionListDescription = styled.Text`
  width: 70%;
`;

class Donate extends Component {
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
          'Diese Operation wird auf deinem Gerät zurzeit nicht unterstützt!',
          [{ text: 'OK' }],
          { cancelable: false },
        );
      }
    });
  };

  render() {
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;

    return (
      <ScrollWrapper>
        <Wrapper>
          <Headline>Support</Headline>
          <Text>
            Unsere Arbeit ist unabhängig, überparteilich, allgemeinnützig und nicht-kommerziell –
            von Menschen für Menschen. Wenn Du Interesse daran hast, dass das Projekt nachhaltig
            Bestand hat, bitten wir Dich an der unabhängigen Crowd-Finanzierung von DEMOCRACY per
            Dauerauftrag mitzuwirken. Pate/in können Sie schon ab 1€ monatlich werden.
          </Text>
          <DonatedBox style={{ marginTop: 21 }} target={10000} occupied={240} />
        </Wrapper>
        <Segment title="Details zum Finanzierungsbedarf">
          <Entry money="560€ von 10.830€" description="min. Finanzierungsziel/Monat" />
          <EntryHeader title={`Infrastrukturkosten`.toUpperCase()} style={{ marginTop: 18 }} />
          <Entry money="500€/Monat" description="Serverkosten zum Livebetrieb" />
          <Entry money="720€/Monat" description="SMS-Versandkosten bei 10.000 Registrierungen" />
          <Entry money="30€/Monat" description="Typeform Pro Lizenz (Fragebögen)" />
          <EntryHeader title={`Weiterentwicklungskosten`.toUpperCase()} />
          <Entry money="2970€/Monat" description="AG-Brutto-Gehaltskosten Manuel Ruck" />
          <Entry money="2970€/Monat" description="AG-Brutto-Gehaltskosten Ulf Gebhardt" />
          <EntryHeader title={`Produktdesign und Verwaltungskosten`.toUpperCase()} />
          <Entry money="2970€/Monat" description="AG-Brutto-Gehaltskosten Marius Krüger" />
          <Entry money="595€/Monat" description="AG-Brutto-Gehaltskosten Hilfskraft" />
          <Entry money="75€/Monat" description="Lohnabrechnung via Steuerberatung" />
        </Segment>
        <Wrapper>
          <Text>Spendenkonto für Daueraufträge oder einmalige Spenden</Text>
          <DefinitionListWrapper style={{ paddingTop: 18 }}>
            <DefinitionListTitle>Empfänger:</DefinitionListTitle>
            <DefinitionListDescription>DEMOCRACY Deutschland e.V.</DefinitionListDescription>
          </DefinitionListWrapper>
          <DefinitionListWrapper>
            <DefinitionListTitle>IBAN:</DefinitionListTitle>
            <DefinitionListDescription>DE33 5003 1000 1049 7560 00</DefinitionListDescription>
          </DefinitionListWrapper>
          <DefinitionListWrapper style={{ paddingBottom: 18 }}>
            <DefinitionListTitle>BIC:</DefinitionListTitle>
            <DefinitionListDescription>TRODEFF1</DefinitionListDescription>
          </DefinitionListWrapper>
          <Text>
            Für den Verein DEMOCRACY Deutschland e.V. ist mit Bescheid des Finanzamt Göttingen vom
            23.08.2017 die Einhaltung der satzungsmäigen Voraussetzungen nach den §§ 51, 59, 60 und
            61 AO festgestellt worden (Nachweis der Gemeinnützigkeit; Satzung). Deine Spenden sind
            daher steuerlich abzugsfähig. Für Spenden unter 200€ jährlich genügt der
            Zahlungsnachweis (z.B. Kontoauszug) zusammen mit unserem Vereinfachten
            Zuwendungsnachweis. Wenn Du eine separate Zuwendungsbestätigung benötigst, schreib uns
            bitte eine E-Mail oder gib in Deiner Überweisung Deine Wohnadresse an.
          </Text>
          <Headline style={{ paddingTop: 18 }}>Spenden via PayPal</Headline>
          <Text>1,5% Deines Spendenbetrags + 0,35 EUR pro Transaktion verbleiben bei PayPal.</Text>

          <Version>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Donate.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Donate;
