import React from "react";
import styled from "styled-components/native";

import Navigation from "./Navigation";

const Wrapper = styled.View`
  flex: 1;
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
  flex: 1;
  resize-mode: center;
`;

const Content = styled.View`
  flex: 1;
  background-color: transparent;
  padding-top: 36;
`;

const Head = styled.View`
  flex-direction: row;
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
    <BackgroundWrapper>
      <BackgroundImage />
    </BackgroundWrapper>
    <Content>
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
