import React from "react";
import { Platform, StatusBar } from "react-native";
import styled from "styled-components/native";

import Navigation from "./Navigation";

const Wrapper = styled.View`
  flex: 1;
`;

// TODO status background enftfernen, wenn weiß oko ist
const StatusBackground = styled.View`
  background-color: rgba(255, 255, 255, 0);
  height: 20;
`;

const BackgroundWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BackgroundImage = styled.Image.attrs({
  source: require("../../../assets/images/bitmap.png")
})`
  resize-mode: stretch;
  width: 100%;
`;

const Content = styled.View`
  flex: 1;
  background-color: transparent;
`;

const Head = styled.View`
  flex-direction: row;
  padding-top: 16;
  padding-left: 16;
`;

const HeadLogo = styled.Image.attrs({
  source: require("../../../assets/images/logo-sidemenu.png")
})``;

const HeadTextWrapper = styled.View`
  justify-content: center;
`;

const HeadText = styled.Text`
  color: #fff;
  font-size: 17;
  padding-left: 16;
`;

const SideMenu = () => (
  <Wrapper>
    <StatusBar barStyle="light-content" />
    <BackgroundWrapper>
      <BackgroundImage />
    </BackgroundWrapper>
    <Content>
      {Platform.OS === "ios" && <StatusBackground />}
      <Head>
        <HeadLogo />
        <HeadTextWrapper>
          <HeadText>Prototyp</HeadText>
          <HeadText>Link-registriert</HeadText>
        </HeadTextWrapper>
      </Head>
      <Navigation />
    </Content>
  </Wrapper>
);

export default SideMenu;
