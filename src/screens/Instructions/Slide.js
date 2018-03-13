import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, Platform, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

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
  font-size: 22;
  letter-spacing: -0.1;
  padding-top: 5;
  font-family: ${Platform.OS === "ios"
    ? "HelveticaNeue-Thin"
    : "sans-serif-light"};
  font-weight: bold;
`;

const TextSub = styled.Text`
  color: #9b9b9b;
  font-size: 15;
  letter-spacing: -0.4;
  padding-top: 1;
  font-family: ${Platform.OS === "ios"
    ? "HelveticaNeue-Thin"
    : "sans-serif-light"};
  font-weight: bold;
  text-align: center;
  height: 40;
`;

const ContainerImages = styled.View`
  flex:0;
  justify-content: center;
`;

const ImageLeft = styled.Image`
  position: absolute;
  resize-mode: contain;
  width: ${Dimensions.get("window").width * 2 / 3};
  left: -${Dimensions.get("window").width * 1 / 2 - 10};
  top: ${Dimensions.get("window").height * 1 / 18};
  opacity: 0.4;
`;

const ImageRight = styled.Image`
  position: absolute;
  resize-mode: contain;
  width: ${Dimensions.get("window").width * 2 / 3};
  left: -${Dimensions.get("window").width * 1 / 6 + 10};
  top: ${Dimensions.get("window").height * 1 / 18};
  opacity: 0.4;
`;

const ImageCenter = styled.Image`
  position: absolute;
  resize-mode: contain;
  width: ${Dimensions.get("window").width * 2 / 3};
  left: -${Dimensions.get("window").width * 1 / 3};
  top: 0;
`;

const ImageCircle = styled.Image`
  position: absolute;
  left: ${Dimensions.get("window").width * 1 / 4};
  top: ${Dimensions.get("window").width * 6 / 13};
`;

const Slide = ({
  ImgHead,
  ImgRight,
  ImgLeft,
  ImgCenter,
  ImgCircle,
  TxtHead,
  TxtSub
}) => (
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
      <LinearGradient
        colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
        locations={[0, 0.5]}
        style={{
          height: 35,
          width: Dimensions.get("window").width,
          position: "absolute",
          bottom: 0
        }}
      />
    </Container>
  );

Slide.propTypes = {
  ImgHead: PropTypes.number.isRequired,
  ImgLeft: PropTypes.number,
  ImgRight: PropTypes.number,
  ImgCenter: PropTypes.number.isRequired,
  ImgCircle: PropTypes.number,
  TxtHead: PropTypes.string.isRequired,
  TxtSub: PropTypes.string.isRequired
};

Slide.defaultProps = {
  ImgLeft: null,
  ImgRight: null,
  ImgCircle: require("../../../assets/tutorial/icon.touch.png")
};

export default Slide;
