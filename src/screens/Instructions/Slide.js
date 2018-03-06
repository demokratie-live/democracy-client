import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, Platform, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  flex: 1;
  align-items: center;
  background: #fff;
  padding-top: ${Platform.OS === "ios" ? 21 : 5};
`;

const ContainerHead = styled.View`
  height: 85;
  justify-content: center;
`;

const ContainerText = styled.View`
  align-items: center;
`;

const TextHead = styled.Text`
  color: #000;
  fontSize: 22;
  letterSpacing: -0.1;
  paddingTop: 5;
  fontFamily: ${Platform.OS === "ios" ? "HelveticaNeue-Thin" : "sans-serif-light"};
  font-weight: bold;
`;

const TextSub = styled.Text`
  color: #9b9b9b;
  fontSize: 15;
  letterSpacing: -0.4;
  paddingTop: 1;
  fontFamily: ${Platform.OS === "ios" ? "HelveticaNeue-Thin" : "sans-serif-light"};
  font-weight: bold;
  text-align: center;
`;

const ContainerImages = styled.View`
  justifyContent: center;
  marginTop: 28;
`;

const ImageLeft = styled.Image`
  position: absolute;
  left: -162;
  top: 29;
`;

const ImageRight = styled.Image`
  position: absolute;
  left: -88;
  top: 29;
`;

const ImageCenter = styled.Image`
  position: absolute;
  left: -125;
  top: 0;
`;

const ImageCircle = styled.Image`
  position: absolute;
  left: 97;
  top: 167;
`;

const Slide = ({ ImgHead, ImgRight, ImgLeft, ImgCenter, ImgCircle, TxtHead, TxtSub }) => (
  <Container>
    <ContainerHead>
      <Image source={ImgHead} />
    </ContainerHead>
    <ContainerText>
      <TextHead>{TxtHead}</TextHead>
      <TextSub>{TxtSub}</TextSub>
    </ContainerText>
    <ContainerImages>
      <ImageLeft source={ImgLeft} />
      <ImageRight source={ImgRight} />
      <ImageCenter source={ImgCenter} />
      <ImageCircle source={ImgCircle} />
    </ContainerImages>
    <LinearGradient colors={['transparent', 'rgba(255, 255, 255, 1)']} style={{ height: 15, width: Dimensions.get('window').width, position: 'absolute', bottom: 0 }} />
  </Container >
);

Slide.propTypes = {
  ImgHead: PropTypes.number.isRequired,
  ImgLeft: PropTypes.number,
  ImgRight: PropTypes.number,
  ImgCenter: PropTypes.number.isRequired,
  ImgCircle: PropTypes.number,
  TxtHead: PropTypes.string.isRequired,
  TxtSub: PropTypes.string.isRequired
}

Slide.defaultProps = {
  ImgLeft: null,
  ImgRight: null,
  ImgCircle: require("../../../assets/tutorial/icon.touch.png")
};

export default Slide;
