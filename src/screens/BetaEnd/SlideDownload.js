import React from 'react';
import styled from 'styled-components/native';
import { Platform, Linking } from 'react-native';
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

const TextHeadNormal = styled.Text``;

const TextHeadUnerline = styled.Text`
  text-decoration: underline;
`;

const CenterImage = styled.Image`
  flex: 1;
`;

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  height: 200;
  justify-content: center;
  align-items: center;
  margin-top: 65;
  margin-bottom: 65;
`;

const TextSub = styled.Text`
  flex: 1;
  color: #9b9b9b;
  font-size: 22;
  padding-top: 1;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
  text-align: center;
  padding-bottom: 18;
`;

const storeImg = () =>
  Platform.OS === 'ios'
    ? require('../../../assets/betaend/appstore.png')
    : require('../../../assets/betaend/playstore.png');

const onPress = () => {
  Linking.openURL('https://www.democracy-deutschland.de');
};

const SlideDownload = () => (
  <Container>
    <HeadImage source={require('../../../assets/tutorial/icon.logo.png')} />
    <TextHead>
      <TextHeadNormal>DEMOCRACY ist </TextHeadNormal>
      <TextHeadUnerline>ab{'\n'}sofort</TextHeadUnerline>
      <TextHeadNormal> im Store erhältlich</TextHeadNormal>
    </TextHead>
    <TouchableOpacity onPress={onPress}>
      <CenterImage source={storeImg()} resizeMode="contain" />
    </TouchableOpacity>
    <TextSub>zum Herunterladen klicken</TextSub>
  </Container>
);

export default SlideDownload;
