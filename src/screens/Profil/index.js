import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import SegmentHead from './components/SegmentHead';
import ListItem from './components/ListItem';

const ScrollWrapper = styled.SectionList`
  flex: 1;
  background-color: #efeff4;
`;

const Text = styled.Text``;

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

  render() {
    return (
      <ScrollWrapper
        renderItem={({ item, index }) => <ListItem key={index}>{item}</ListItem>}
        renderSectionHeader={({ section: { title } }) => <SegmentHead>{title}</SegmentHead>}
        sections={[
          { title: 'Identität', data: ['Status', 'Wahlkreis'] },
          { title: 'Einstellungen', data: ['Benachrichtigungen', 'Newsletter'] },
          {
            title: 'Auswertungen',
            data: ['Wahl-O-Meter', 'Abgeordnetenprofil', 'Persönliche Historie'],
          },
        ]}
        keyExtractor={(item, index) => item + index}
      />
    );
  }
}

Profil.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Profil;
