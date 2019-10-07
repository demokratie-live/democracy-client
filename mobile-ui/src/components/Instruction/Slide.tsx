import React from 'react';
import styled from 'styled-components/native';
import { Dimensions, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
  padding-top: ${() => {
    return Platform.OS === 'ios' ? 24 : 8;
  }};
  padding-left: 18;
  padding-right: 18;
`;

const ContainerHead = styled.View``;

const ContainerText = styled.View`
  align-items: center;
  z-index: 100;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22;
  padding-top: 15;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Thin'
    : 'sans-serif-light'};
`;

const TextSub = styled.Text`
  color: #9b9b9b;
  font-size: 15;
  padding-top: 1;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Thin'
    : 'sans-serif-light'};
  text-align: center;
  margin-bottom: 18;
`;

const ContainerImages = styled.View`
  flex: 1;
  width: 100%;
  max-width: 600;
  justify-content: center;
  align-items: center;
  min-height: 518;
`;

const ContainerCenterImage = styled.View`
  position: absolute;
  align-items: center;
`;

const ImageTranspContainer = styled.View`
  position: absolute;
  background-color: #fff;
  border-radius: 40;
`;

const ImageLeft = styled.Image`
  opacity: 0.4;
  margin-top: 50;
`;

const ImageRight = styled.Image`
  opacity: 0.4;
  margin-top: 50;
`;

const ImageCenter = styled.Image``;

const ButtonCircle = styled.TouchableOpacity`
  position: absolute;
  right: -20;
  top: 165;
`;
const ButtonVerify = styled.TouchableOpacity`
  bottom: 175;
  background-color: rgb(126, 211, 33);
  border-radius: 8;
  width: 180;
  height: 41;
  position: absolute;
`;

const TextVerify = styled.Text`
  color: #fff;
  font-size: 22;
  text-align: center;
  padding-top: 6;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Thin'
    : 'sans-serif-light'};
`;

const ImageCircle = styled.Image``;

const NewMarker = styled.Image.attrs({
  source: require('./assets/icon.new.png'),
})`
  position: absolute;
  top: 28;
  left: 18;
`;

export interface Props {
  head: {
    image: NodeRequire;
    title: string;
    description: string;
  };
  images: {
    left?: NodeRequire;
    center: NodeRequire;
    right?: NodeRequire;
    circle?: NodeRequire;
  };
  isNew?: boolean;
  verify?: () => void;
  nextPage?: () => void;
}

const Slide: React.FC<Props> = ({ head, images, isNew, nextPage, verify }) => {
  const circleImage = images.circle || require('./assets/icon.touch.png');
  return (
    <Container>
      {isNew && <NewMarker />}
      <ContainerHead>
        <Image source={head.image} />
      </ContainerHead>
      <ContainerText>
        <TextHead>{head.title}</TextHead>
        <TextSub>{head.description}</TextSub>
      </ContainerText>
      <ContainerImages>
        {images.left && (
          <ImageTranspContainer style={{ alignSelf: 'flex-start' }}>
            <ImageLeft source={images.left} />
          </ImageTranspContainer>
        )}
        {images.right && (
          <ImageTranspContainer style={{ alignSelf: 'flex-end' }}>
            <ImageRight source={images.right} />
          </ImageTranspContainer>
        )}
        <ContainerCenterImage>
          <ImageCenter source={images.center} />
          <ButtonCircle onPress={nextPage}>
            <ImageCircle source={circleImage} />
          </ButtonCircle>
          {verify && (
            <ButtonVerify onPress={verify}>
              <TextVerify>Verifizieren</TextVerify>
            </ButtonVerify>
          )}
        </ContainerCenterImage>
      </ContainerImages>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        locations={[0, 0.5]}
        style={{
          height: 35,
          width: Dimensions.get('window').width,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </Container>
  );
};

export default Slide;
