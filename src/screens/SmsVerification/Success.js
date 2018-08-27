import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Navigator } from 'react-native-navigation';
import styled from 'styled-components/native';
import { Platform, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Config from './../../config';

import Button from './Components/Button';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
  padding-top: ${() => {
    if (DeviceInfo.getModel() === 'iPhone X') {
      return 36;
    }
    return Platform.OS === 'ios' ? 24 : 8;
  }};
  padding-horizontal: 18;
`;

const HeadImage = styled.Image`
  margin-top: 15;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22;
  padding-top: 25;
  text-align: center;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
`;

const TextCenterNormal = styled.Text``;

const TextCenterBold = styled.Text`
  font-weight: bold;
`;

const TextCenter = styled.Text`
  flex: 1;
  color: #9b9b9b;
  font-size: 17;
  padding-top: 50;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  text-align: center;
  padding-bottom: 18;
`;

const ButtonContainer = styled.View`
  flex: 1
  flex-direction: row;
  width: 100%;
  padding-right: 25;
  padding-left: 25;
`;

class SmsSuccess extends Component {
  onClose = async () => {
    await this.props.onComplete();
    this.props.navigator.dismissAllModals();
  };

  onDonate = async () => {
    await this.onClose();
    Linking.openURL(Config.URL_DONATE);
  };

  render() {
    return (
      <Container>
        <HeadImage source={require('../../../assets/tutorial/icon.logo.png')} />
        <TextHead>{`Deine Verifikation\nwar erfolgreich!`}</TextHead>
        <TextCenter>
          <TextCenterNormal>
            {`Das Versenden Deiner Bestätigungs-\nSMS hat das Projekt DEMOCRACY\nDeutschland `}
          </TextCenterNormal>
          <TextCenterBold>7,2 Cent</TextCenterBold>
          <TextCenterNormal>
            {` gekostet.\n\nJede Spende hilft dem DEMOCRACY\nDeutschland e.V. erfolgreich seine\nunabhängige, überparteiliche und\nallgemeinnützige demokratische\nArbeit voranzubringen.`}
          </TextCenterNormal>
        </TextCenter>
        <ButtonContainer>
          <Button
            onPress={this.onClose}
            style={{
              width: '50%',
              height: 40,
              marginTop: 18,
              borderRadius: 2,
              backgroundColor: '#fff',
            }}
            textStyle={{
              color: 'rgb(0,118,255)',
            }}
            title="Später"
          />
          <Button
            onPress={this.onDonate}
            style={{
              width: '50%',
              height: 40,
              marginTop: 18,
              borderRadius: 2,
              backgroundColor: '#4494D3', // !authCodeExpires ? '#4494D3' : '#9AC5E7',
            }}
            title="SPENDEN"
          />
        </ButtonContainer>
      </Container>
    );
  }
}

SmsSuccess.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default SmsSuccess;
