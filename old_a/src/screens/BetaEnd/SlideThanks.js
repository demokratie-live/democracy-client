import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: { flexGrow: 1, alignItems: 'center', justifyContent: 'space-between' },
}))`
  flex: 1;
  background: #fff;
  padding-top: ${() => {
    if (DeviceInfo.getModel() === 'iPhone X') {
      return 36;
    }
    return Platform.OS === 'ios' ? 24 : 8;
  }};
  padding-horizontal: 18;
`;

const Head = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;

const TextHead = styled.Text`
  color: #000;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  font-size: 42;
  padding-top: 10;
  padding-bottom: 10;
`;

const Center = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

const CenterImage = styled.Image`
  height: 200;
`;

const Footer = styled.View`
  flex: 1;
  align-content: center;
  justify-content: center;
`;

const TextSub = styled.Text`
  flex: 1;
  color: #9b9b9b;
  font-size: 22;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  text-align: center;
  padding-top: 10;
  padding-bottom: 20;
`;

const SlideThanks = () => (
  <Container>
    <Head>
      <TextHead>Vielen Dank,</TextHead>
    </Head>
    <Center>
      <CenterImage source={require('../../../assets/betaend/logo.png')} resizeMode="contain" />
    </Center>
    <Footer>
      <TextSub>dass Du an der BETA{'\n'}teilgenommen hast</TextSub>
    </Footer>
  </Container>
);

export default SlideThanks;
