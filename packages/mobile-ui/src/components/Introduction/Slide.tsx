import React from 'react';

import { Dimensions, Platform, Image, ImageSourcePropType } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { PageProps } from '../Pager';
import { styled } from '../../styles';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
  padding-top: ${() => {
    return Platform.OS === 'ios' ? 24 : 8;
  }}px;
  padding-left: 18px;
  padding-right: 18px;
`;

const ContainerHead = styled.View``;

const ContainerText = styled.View`
  align-items: center;
  z-index: 100;
`;

const TextHead = styled.Text`
  color: #000;
  font-size: 22px;
  padding-top: 15px;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Thin'
    : 'sans-serif-light'};
`;

const TextSub = styled.Text`
  color: ${({ theme }) => theme.textColors.secondary};
  font-size: 15px;
  padding-top: 1px;
  text-align: center;
  margin-bottom: 18px;
`;

const ContainerImages = styled.View`
  flex: 1;
  width: 100%;
  max-width: 600px;
  justify-content: center;
  align-items: center;
  min-height: 518px;
`;

const ContainerCenterImage = styled.View`
  position: absolute;
  align-items: center;
`;

const ImageTranspContainer = styled.View`
  position: absolute;
  background-color: #fff;
  border-radius: 40px;
`;

const ImageLeft = styled.Image`
  opacity: 0.4;
  margin-top: 50px;
`;

const ImageRight = styled.Image`
  opacity: 0.4;
  margin-top: 50px;
`;

const ImageCenter = styled.Image``;

const ButtonCircle = styled.TouchableOpacity`
  position: absolute;
  right: -20px;
  top: 165px;
`;
const ButtonVerify = styled.TouchableOpacity`
  bottom: 175px;
  background-color: rgb(126, 211, 33);
  border-radius: 8px;
  width: 180px;
  height: 41px;
  position: absolute;
`;

const TextVerify = styled.Text`
  color: #fff;
  font-size: 22px;
  text-align: center;
  padding-top: 6px;
  font-family: ${Platform.OS === 'ios'
    ? 'HelveticaNeue-Thin'
    : 'sans-serif-light'};
`;

const ImageCircle = styled.Image``;

export const NewMarker = styled.Image.attrs({
  source: require('./assets/icon.new.png'),
})`
  position: absolute;
  top: 28px;
  left: 18px;
`;

export interface Slide {
  head: {
    image: ImageSourcePropType;
    title: string;
    description: string;
  };
  images: {
    left?: ImageSourcePropType;
    center: ImageSourcePropType;
    right?: ImageSourcePropType;
    circle?: ImageSourcePropType;
  };
  isNew?: boolean;
  verify?: () => void;
}

export interface Props extends Slide, PageProps {
  nextSlide?: () => void;
}

export const Slide: React.FC<Props> = ({
  head,
  images,
  isNew,
  nextSlide,
  verify,
  nextPage,
}) => {
  const circleImage = images.circle || require('./assets/icon.touch.png');

  const handleNextSlide = () => {
    if (nextPage && !nextSlide) {
      nextPage();
      return;
    } else if (nextSlide) {
      nextSlide();
      return;
    }
    return;
  };

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
          <ButtonCircle onPress={handleNextSlide}>
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
