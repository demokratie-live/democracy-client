import React from "react";
import { Platform, StatusBar } from "react-native";
import styled from "styled-components/native";
import { graphql } from "react-apollo";
import { PropTypes } from "prop-types";
import { Navigation } from "react-native-navigation";

import NavigationX from "./Navigation";

import currentScreenQuery from "../../graphql/queries/currentScreen";

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
  source: require("../../../assets/images/stars2.png")
})`
  resize-mode: ${Platform.OS === "ios" ? "repeat" : "stretch"};
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  flex: 1;
  background-color: rgba(68, 148, 211, 0.2);
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

const SideMenu = ({ data, data: { currentScreen }, navigator, ...rest }) => {
  Navigation.events().registerCommandListener((name, params) => {
    console.log("DDBUG 7", name, params);
  });

  const navigateTo = ({ screenId, title }) => {
    if (screenId) {
      if (screenId === "democracy.Instructions") {
        navigator.showModal({
          screen: screenId,
          navigatorStyle: { navBarHidden: true, orientation: "portrait" }
        });
      } else {
        // navigator.handleDeepLink({
        //   link: screenId,
        //   payload: { title, from: "sideMenu" }
        // });

        console.log("DDBUG", rest);
        Navigation.setStackRoot("mainView", {
          component: {
            name: screenId,
            options: {
              sideMenu: {
                left: {
                  visible: false
                }
              }
            }
          }
        });
      }
    }
    // navigator.toggleDrawer({ side: "left" });
  };
  return (
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
        <NavigationX currentScreen={currentScreen} navigateTo={navigateTo} />
      </Content>
    </Wrapper>
  );
};

SideMenu.propTypes = {
  data: PropTypes.shape().isRequired
};

export default graphql(currentScreenQuery)(SideMenu);
