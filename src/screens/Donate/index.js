import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';

import Config from '../../config';

import Segment from '../Detail/Segment';
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import EntryHeader from './EntryHeader';

import {
  donate1Head,
  donate1Text,
  donate2Head,
  donate3Link1,
  donate3Link2,
  donate3Link3,
  donate3Text1,
  donate3Text2,
  donate3Text3,
  donate3Text4,
  donate3Text5,
  donate3Text6,
  donate3Text7,
  donate4Head,
  donate4Text,
  donateList1Head,
  donateList1Text,
  donateList2Head,
  donateList2Text,
  donateList3Head,
  donateList3Text,
} from './content';

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

const TextLink = styled.Text`
  font-size: 15;
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

const DefinitionListWrapper = styled.View`
  flex-direction: row;
  padding-vertical: 3;
`;

const DefinitionListTitle = styled.Text`
  width: 30%;
  font-weight: 600;
  color: #8f8e94;
`;

const DefinitionListDescription = styled.Text`
  width: 70%;
  color: #8f8e94;
`;

const DonateTouchable = styled.TouchableOpacity`
  align-items: center;
  padding-top: 15;
`;

const DonateImage = styled.Image.attrs({
  source: require('../../../assets/images/PayPal-Donate-Button-Transparent.png'),
  resizeMode: 'contain',
})`
  height: 100;
  width: 80%;
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

    if (!props.onClose) {
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
    } else {
      this.props.navigator.setStyle({
        navBarBackgroundColor: '#4494d3',
        navBarButtonColor: '#fff',
        navBarTextColor: '#fff',
      });
      props.navigator.setButtons({
        leftButtons: [{}],
        rightButtons: [
          {
            title: 'Fertig',
            id: 'donateFinish',
          },
        ],
      });

      props.navigator.addOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }
  }

  onNavigatorEvent = event => {
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'donateFinish') {
        this.props.onClose();
      }
    }
  };

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
          <Headline>{donate1Head}</Headline>
          <Text style={{ marginBottom: 21 }}>{donate1Text}</Text>
          <DonatedBox target={10830} occupied={881} />
        </Wrapper>
        <Segment title="Details zum Finanzierungsbedarf" open>
          <Entry
            target={10830}
            occupied={881}
            money="881€ von 10.830€"
            description="min. Finanzierungsziel/Monat"
          />
          <EntryHeader title={`Infrastrukturkosten`.toUpperCase()} style={{ marginTop: 18 }} />
          <Entry
            target={500}
            occupied={44}
            money="500€"
            dueDate="(ab 01.10.18)"
            description="Serverkosten zum Livebetrieb"
          />
          <Entry
            target={720}
            occupied={0}
            money="720€"
            dueDate="(ab 01.10.18)"
            description="SMS-Versandkosten bei 10.000 Registrierungen"
          />
          <Entry
            target={30}
            occupied={30}
            money="30€"
            dueDate="(ab sofort)"
            description="Typeform Pro Lizenz (Fragebögen)"
          />
          <EntryHeader title={`Entwicklung`.toUpperCase()} />
          <Entry
            target={2970}
            occupied={0}
            money="2970€"
            dueDate="(ab 01.02.19)"
            description="AG-Brutto-Gehaltskosten Manuel Ruck (1.640€ netto)"
          />
          <Entry
            target={2970}
            occupied={0}
            money="2970€"
            dueDate="(ab 01.02.19)"
            description="AG-Brutto-Gehaltskosten Ulf Gebhardt (1.640€ netto)"
          />
          <EntryHeader title={`Produktdesign und Verwaltung`.toUpperCase()} />
          <Entry
            target={727}
            occupied={727}
            money="727€"
            dueDate="(ab sofort)"
            description="AG-Brutto-Gehaltskosten Marius Krüger (500€ netto)"
          />
          <Entry
            target={2970}
            occupied={0}
            money="2970€"
            dueDate="(ab 01.04.19)"
            description="AG-Brutto-Gehaltskosten Marius Krüger (1.640€ netto)"
          />
          <Entry
            target={595}
            occupied={0}
            money="595€"
            dueDate="(ab sofort)"
            description="AG-Brutto-Gehaltskosten Hilfskraft (450€ netto)"
          />
          <Entry
            target={75}
            occupied={75}
            money="75€"
            dueDate="(ab sofort)"
            description="Lohnabrechnung via Steuerberatung"
          />
        </Segment>
        {Platform.OS === 'ios' ? (
          <Wrapper>
            <Text>{`Die verbleibende Seite steht unter iOS leider nicht zur Verfügung.\n`}</Text>
            <Text>
              <Text>Besuchen Sie </Text>
              <TextLink
                onPress={() => Linking.openURL('https://www.democracy-deutschland.de/#!donate')}
              >
                unsere Webseite
              </TextLink>
              <Text> für mehr Informationen.</Text>
            </Text>
            <Version>{version}</Version>
          </Wrapper>
        ) : (
          <Wrapper>
            <Headline>{donate2Head}</Headline>
            <DefinitionListWrapper style={{ paddingTop: 18 }}>
              <DefinitionListTitle>{donateList1Head}</DefinitionListTitle>
              <DefinitionListDescription>{donateList1Text}</DefinitionListDescription>
            </DefinitionListWrapper>
            <DefinitionListWrapper>
              <DefinitionListTitle>{donateList2Head}</DefinitionListTitle>
              <DefinitionListDescription>{donateList2Text}</DefinitionListDescription>
            </DefinitionListWrapper>
            <DefinitionListWrapper style={{ paddingBottom: 18 }}>
              <DefinitionListTitle>{donateList3Head}</DefinitionListTitle>
              <DefinitionListDescription>{donateList3Text}</DefinitionListDescription>
            </DefinitionListWrapper>
            <Text>
              <Text>{donate3Text1}</Text>
              <TextLink onPress={() => Linking.openURL(donate3Link1)}>{donate3Text2}</TextLink>
              <Text>{donate3Text3}</Text>
              <TextLink onPress={() => Linking.openURL(donate3Link2)}>{donate3Text4}</TextLink>
              <Text>{donate3Text5}</Text>
              <TextLink onPress={() => Linking.openURL(donate3Link3)}>{donate3Text6}</TextLink>
              <Text>{donate3Text7}</Text>
            </Text>
            <Headline style={{ paddingTop: 18 }}>{donate4Head}</Headline>
            <Text>{donate4Text}</Text>
            <DonateTouchable onPress={this.linking(Config.URL_DONATE)}>
              <DonateImage />
            </DonateTouchable>
            <Version>{version}</Version>
          </Wrapper>
        )}
      </ScrollWrapper>
    );
  }
}

Donate.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  onClose: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};

Donate.defaultProps = {
  onClose: false,
};

export default Donate;
