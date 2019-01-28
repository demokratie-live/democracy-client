import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql, compose } from 'react-apollo';

// Components
import SegmentHead from './components/SegmentHead';
import ListItem from './components/ListItem';

// GraphQL
import GET_CONSTITUENCY from '../../graphql/queries/local/constituency';
import GET_STATISTIC from '../../graphql/queries/getStatistic';

const ScrollWrapper = styled.SectionList`
  flex: 1;
  background-color: #efeff4;
`;

class Profil extends Component {
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

  navigateTo = screen => () => {
    const { navigator } = this.props;
    switch (screen) {
      case 'constituency':
        navigator.push({
          screen: 'democracy.Profil.Constituency',
          title: 'Wahlkreissuche',
          backButtonTitle: '',
        });
        break;
      case 'verificate':
        navigator.showModal({
          screen: 'democracy.SmsVerification',
          navigatorStyle: { orientation: 'portrait' },
        });
        break;
      case 'statistic':
        navigator.push({
          screen: 'democracy.Statistic',
          title: 'Statistik',
          backButtonTitle: '',
          passProps: {
            noMenu: true,
          },
        });
        break;
      case 'notifications-settings':
        navigator.push({
          screen: 'democracy.Notifications',
          title: 'Benachrichtigungen',
          backButtonTitle: '',
          passProps: {
            noMenu: true,
          },
        });
        break;
      case 'wahl-o-meter':
        navigator.push({
          screen: 'democracy.WahlOMeter',
          title: `Wahl-\u00D8-Meter`,
          backButtonTitle: '',
          passProps: {
            noMenu: true,
          },
        });
        break;
      case 'memberProfil':
        navigator.push({
          screen: 'democracy.MemberProfil',
          title: `Abgeordnetenprofil`,
          backButtonTitle: '',
          passProps: {
            noMenu: true,
          },
        });
        break;

      default:
        break;
    }
  };

  render() {
    return (
      <ScrollWrapper
        renderItem={({ item, index }) => (
          <ListItem
            key={index}
            text={item.text}
            arrow={item.arrow !== false}
            onPress={item.onPress}
          >
            {item.title}
          </ListItem>
        )}
        renderSectionHeader={({ section: { title } }) => <SegmentHead>{title}</SegmentHead>}
        sections={[
          {
            title: 'Identität',
            data: [
              {
                title: 'Status',
                text:
                  this.props.verified === true
                    ? 'Verifiziert'
                    : this.props.verified === false
                    ? 'Verifizieren'
                    : '…',
                arrow: this.props.verified === false,
                onPress: this.props.verified === false ? this.navigateTo('verificate') : null,
              },
              {
                title: 'Wahlkreis',
                text: `WK ${this.props.constituency}`,
                onPress: this.navigateTo('constituency'),
              },
            ],
          },
          {
            title: 'Einstellungen',
            data: [
              {
                title: 'Benachrichtigungen',
                onPress: this.navigateTo('notifications-settings'),
              },
              // { title: 'Newsletter' },
            ],
          },
          {
            title: 'Auswertungen',
            data: [
              { title: `Wahl-\u00D8-Meter`, onPress: this.navigateTo('wahl-o-meter') },
              { title: 'Abgeordnetenprofil', onPress: this.navigateTo('memberProfil') },
              {
                title: 'Persönliche Historie',
                onPress: this.navigateTo('statistic'),
              },
            ],
          },
        ]}
        keyExtractor={item => item.title}
      />
    );
  }
}

Profil.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  verified: PropTypes.bool.isRequired,
  constituency: PropTypes.string.isRequired,
};

export default compose(
  graphql(GET_CONSTITUENCY, {
    props: ({ data }) => ({
      constituency:
        data.constituency && data.constituency.constituency
          ? data.constituency.constituency
          : 'auswählen',
    }),
  }),
  graphql(GET_STATISTIC, {
    props: ({ data }) => ({
      verified: data.loading ? null : data.voteStatistic ? true : false,
    }),
  }),
)(Profil);
