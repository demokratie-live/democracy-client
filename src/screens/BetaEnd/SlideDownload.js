import React from 'react';
import styled from 'styled-components/native';
import { Platform, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import Config from './../../config';

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
  align-items: center;
  justify-content: flex-start;
`;

const HeadImage = styled.Image`
  margin-top: 20;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22;
  padding-top: 15;
  text-align: center;
  font-family: ${Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light'};
`;

const TextHeadNormal = styled.Text``;

const TextHeadUnerline = styled.Text`
  text-decoration: underline;
`;

const Center = styled.View`
  flex: 1;
  align-content: center;
  justify-content: space-between;
`;

const CenterImage = styled.Image`
  height: 80;
`;

const TouchableOpacity = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  margin-top: 30;
  margin-bottom: 20;
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
  Linking.openURL(
    Platform.OS === 'ios' ? Config.BETA_END_APPSTORE_URL : Config.BETA_END_PLAYSTORE_URL,
  );
};

const SlideDownload = () => (
  <Container>
    <Head>
      <HeadImage source={require('../../../assets/tutorial/icon.logo.png')} />
      <TextHead>
        <TextHeadNormal>DEMOCRACY ist </TextHeadNormal>
        <TextHeadUnerline>ab{'\n'}sofort</TextHeadUnerline>
        <TextHeadNormal> im Store erhältlich</TextHeadNormal>
      </TextHead>
    </Head>
    <Center>
      <TouchableOpacity onPress={onPress}>
        <CenterImage source={storeImg()} resizeMode="contain" />
      </TouchableOpacity>
      <TextSub>zum Herunterladen klicken</TextSub>
    </Center>
  </Container>
);

export default SlideDownload;
