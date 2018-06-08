/* eslint-disable no-irregular-whitespace */
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Platform } from "react-native";
import { Navigator } from "react-native-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import DeviceInfo from "react-native-device-info";

const ScrollWrapper = styled.ScrollView`
  flex: 1;
  background-color: #ffffff;
`;

const Wrapper = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 30;
  padding-horizontal: 18;
`;

const Logo = styled.Image.attrs({
  source: require("../../assets/images/logo-text10X.png")
})`
  margin-bottom: 18;
`;

const Text = styled.Text`
  text-align: justify;
  font-size: 15;
  color: #8f8e94;
  padding-top: 11;
`;

const Bold = styled(Text)`
  font-weight: bold;
`;

const Version = styled.Text`
  font-size: 15;
  color: #8f8e94;
  padding-top: 28;
  padding-bottom: 11;
`;

const LoverWrapper = styled.View`
  padding-top: 18;
`;

const LoverImageWrapper = styled.View`
  flex: 1;
  max-width: 315;
  max-height: 315;
`;

const LoverImage = styled.ImageBackground.attrs({
  source: require("../../assets/images/lover.jpg"),
  resizeMode: "contain"
})`
  flex: 1;
  height: undefined;
  width: undefined;
  margin-top: 11;
`;

const AdditionalThanksLogoWrapper = styled.View`
  padding-top: 18;
  flex-direction: row;
  width: 100%;
  max-width: 400;
  justify-content: space-between;
`;

const AdditionalThanksLogo = styled.Image``;

const Lover = () => (
  <LoverWrapper>
    <Text>Christian Vatter – VERLIEBTE/R des Monats Juni</Text>
    <LoverImageWrapper>
      <LoverImage />
    </LoverImageWrapper>
  </LoverWrapper>
);

class Security extends Component {
  static navigatorStyle = {
    navBarButtonColor: "#FFFFFF",
    navBarBackgroundColor: "#4494d3",
    navBarTextColor: "#FFFFFF",
    navBarTextFontSize: 17
  };

  constructor(props) {
    super(props);

    const menuIcon = Platform.OS === "ios" ? "ios-menu" : "md-menu";

    Ionicons.getImageSource(menuIcon, 24, "#FFFFFF").then(icon => {
      props.navigator.setButtons({
        leftButtons: [
          {
            icon,
            id: "menu"
          }
        ]
      });
    });
  }

  render() {
    const version = `Version: ${DeviceInfo.getReadableVersion()
      .split(".")
      .slice(0, 3)
      .join(".")}`;
    return (
      <ScrollWrapper>
        <Wrapper>
          <Logo />
          <Text>
            …ist eine gemeinnützige App <Bold>von Menschen für Menschen</Bold>,
            die als öffentliche Infrastruktur das Funktionieren einer lebendigen
            Demokratie begünstigen soll.
          </Text>
          <Text>
            Und gerade weil so eine große Idee zur Umsetzung in diese Welt auch
            ein großes Portemonnaie braucht(e), gilt ein ganz besonderer Dank
            allen unseren Unterstüzerinnen und Unterstützern, die diesen
            Prototyp möglich gemacht haben, insbesondere…
          </Text>
          <Lover />
          <Text>und den CO-GRÜNDER/INNEN</Text>
          <Text>
            Frank Schuster, Stefan Schulz-Günther, Malte Klingauf,
            Christian Luz, David Kleuker, Ingo Schmidt, Mario Polenz,
            Michaela Zimmermann, Danny Hügelheim, Maria Kühne,
            Andreas Lederwascher, Diethard Tauschel, Nico Meuter, Stefan Irkens,
            Joachim Wolff, Carolin Mey, Jörg Hampel, Heiko Held,
            Dr. Martin Katz, Christine Slotty, Christopher Böhm, Jürgen Intveen,
            Valentin Lewandowski, Thomas Hardt, Christian Heigele,
            Claudia Ruthner, Karl Scheel, Stephan Korn, Erika Körner,
            Edgar Renje, Erik Lichtenstein, Andrea Guse, Ole Albers, Anna Wolf,
            Sebastian Brandt, Ronald Neuber, Sven Bendig, Oliver Beck,
            Sven Fischer, Uwe Bessle, Nuno M. Buljubasic, Marius Schäfer,
            Simone Ganz, Mathias Wendeler, Thorsten Biegner, Mike Gerstner.
          </Text>
          <Text>UNSER BESONDERE DANK GILT AUCH</Text>
          <AdditionalThanksLogoWrapper>
            <AdditionalThanksLogo
              source={require("../../assets/images/logo-ip.png")}
            />
            <AdditionalThanksLogo
              source={require("../../assets/images/logo-herti.png")}
            />
            <AdditionalThanksLogo
              source={require("../../assets/images/logo-sn.png")}
            />
          </AdditionalThanksLogoWrapper>
          <Version style={{ paddingTop: 36 }}>{version}</Version>
        </Wrapper>
      </ScrollWrapper>
    );
  }
}

Security.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default Security;
