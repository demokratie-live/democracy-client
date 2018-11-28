import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { graphql } from 'react-apollo';

// Components
import SegmentHead from './components/SegmentHead';
import ListItem from './components/ListItem';

// GraphQL
import GET_CONSTITUENCY from '../../graphql/queries/local/constituency';

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
          navigatorStyle: { navBarHidden: true, orientation: 'portrait' },
        });
        break;

      default:
        break;
    }
  };

  render() {
    console.log('TESTXYZ render profil', this.props);
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
                text: 'Verifizieren',
                arrow: true,
                onPress: this.navigateTo('verificate'),
              },
              {
                title: 'Wahlkreis',
                text: `WK ${this.props.data.constituency.constituency}`,
                onPress: this.navigateTo('constituency'),
              },
            ],
          },
          {
            title: 'Einstellungen',
            data: [{ title: 'Benachrichtigungen' }, { title: 'Newsletter' }],
          },
          {
            title: 'Auswertungen',
            data: [
              { title: 'Wahl-O-Meter' },
              { title: 'Abgeordnetenprofil' },
              { title: 'Persönliche Historie' },
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
};

export default graphql(GET_CONSTITUENCY, {
  options: {
    fetchPolicy: 'network-only',
  },
})(Profil);
