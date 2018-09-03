import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import { Platform, Linking, Alert } from 'react-native';
import { Navigator } from 'react-native-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';

import Segment from '../Detail/Segment';

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  padding-top: 30;
  padding-horizontal: 18;
  align-items: center;
`;

const Text = styled.Text`
  font-size: 15;
  color: #8f8e94;
`;

const ContactWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const IconWrapper = styled.TouchableOpacity`
  width: 65;
  height: 65;
  border-width: 2;
  border-radius: 33;
  justify-content: center;
  align-items: center;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
  text-align: center;
`;

const ContactIcons = styled(FontAwesome).attrs({
  size: 40,
  color: '#000000',
})``;

class Support extends Component {
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
        <Segment title="Warum fehlt der Antragsteller?">
          <Text>
            Immer wieder kam und kommt die Frage auf, warum wir den Antragsteller eines Papiers
            nicht ebenfalls unter den Detailinformationen eines Vorgangs anzeigen. Dies hat einen
            ganz einfachen Grund: Eines der Kernanliegen von DEMOCRACY ist es, den Wandel von einer
            von Sachfragen und tatsächlichen Entscheidungen losgelösten und mit Versprechen und
            Emotionen geführten hin zu einer an konkreten Entscheidungen erfahrbaren und
            lösungsorientierten Politik für Bürger mitzugestalten. Das Abstimmungsverhalten vorab
            mit politischen Farben zu beeinflussen, ist insofern nicht Teil unseres Kernkonzepts.
            Nehmen Sie es als Chance, ihre (politische) Einstellungen anhand der konkret vertretenen
            Inhalte nochmal zu überprüfen.
          </Text>
        </Segment>
        <Segment title="Was zeigt die Zahl unter dem Dach an?">
          <Text>Lorem ipsum</Text>
        </Segment>
        <Segment title="Was bedeuten die Beratungszustände?">
          <Text>ipsum lorem?</Text>
        </Segment>

        <Version>{version}</Version>
      </ScrollWrapper>
    );
  }
}

Support.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

export default Support;
