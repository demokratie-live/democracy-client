import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

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

const TextHead = styled.Text`
  color: #000;
  font-size: 42;
  padding-top: 100;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  padding-bottom: 40;
`;

const CenterImage = styled.Image`
  flex: 1;
  height: 235;
  justify-content: center;
  align-items: center;
`;

const TextSub = styled.Text`
  flex: 1;
  color: #9b9b9b;
  font-size: 22;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  text-align: center;
  padding-top: 40;
`;

const SlideThanks = () => (
  <Container>
    <TextHead>Vielen Dank,</TextHead>
    <CenterImage source={require('../../../assets/betaend/logo.png')} resizeMode="contain" />
    <TextSub>dass Du an der BETA{'\n'}teilgenommen hast</TextSub>
  </Container>
);

export default SlideThanks;
