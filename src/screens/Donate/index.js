import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert, View } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import { graphql } from 'react-apollo';

import Config from '../../config';

import Segment from '../Detail/Segment';
import DonatedBox from './DonatedBox';
import Entry from './Entry';
import EntryHeader from './EntryHeader';

// GraphQl
import DONATION_STATUS from '../../graphql/queries/donationStatus';

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

  renderDonationEntries = entries =>
    entries.map(entry => {
      switch (entry.type) {
        case 0:
          return this.renderEntryHeadline(entry);
        case 1:
          return this.renderEntry(entry);

        default:
          return null;
      }
    });

  renderEntryHeadline = entry => (
    <EntryHeader key={entry.id} title={entry.text_description} style={{ marginTop: 18 }} />
  );

  renderEntry = entry => (
    <Entry
      key={entry.id}
      target={entry.max}
      occupied={entry.value}
      money={`${entry.max}€`}
      dueDate={entry.text_date}
      description={`${entry.text_description} ${entry.text_cost} ${entry.text_description_subtext}`}
    />
  );

  render() {
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split('.')
      .slice(0, 3)
      .join('.')} (${DeviceInfo.getBuildNumber()})`;

    const { donationStatus } = this.props;

    return (
      <ScrollWrapper>
        {donationStatus &&
          donationStatus.result && (
            <View>
              <Wrapper>
                <Headline>{donate1Head}</Headline>
                <Text>{donate1Text}</Text>
                <Text style={{ marginBottom: 21 }}>Spendenstand vom {donationStatus.result.donation_date}</Text>
                <DonatedBox
                  target={donationStatus.result.donation_value_goal}
                  occupied={donationStatus.result.donation_value}
                />
              </Wrapper>
              <Segment title="Details zum Finanzierungsbedarf" open>
                <Entry
                  target={donationStatus.result.donation_value_goal}
                  occupied={donationStatus.result.donation_value}
                  money={`${donationStatus.result.donation_value}€ von ${
                    donationStatus.result.donation_value_goal
                  }€`}
                  description="min. Finanzierungsziel/Monat"
                />
                {this.renderDonationEntries(donationStatus.result.donation_data)}
              </Segment>
            </View>
          )}
        {Platform.OS === 'ios' ? (
          <Wrapper>
            <Text>{`Die verbleibende Seite steht unter iOS leider nicht zur Verfügung.\n`}</Text>
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
  donationStatus: PropTypes.shape(),
};

Donate.defaultProps = {
  onClose: false,
  donationStatus: {},
};

export default graphql(DONATION_STATUS, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
  props: ({ data: { donationStatus } }) => ({
    donationStatus,
  }),
})(Donate);
