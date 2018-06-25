import React, { Component } from "react";
import styled from "styled-components/native";
import { Navigation } from "react-native-navigation";

const Wrapper = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderElement = styled.View`
  flex: 1;
`;

const TitleText = styled.Text.attrs({})`
  font-size: 17;
  color: #fff;
  font-weight: bold;
`;

const ButtonText = styled.Button.attrs({
  color: "#fff"
})`
  font-size: 17;
`;

class Header extends Component {
  onSave = () => {
    this.clickBack();
  };

  clickBack = () => {
    Navigation.dismissModal({
      animationType: "slide-down" // 'none' / 'slide-down' , dismiss animation for the modal (optional, default 'slide-down')
    });
  };

  render() {
    return (
      <Wrapper>
        <HeaderElement style={{ alignItems: "flex-start" }}>
          <ButtonText title="Zurück" onPress={this.clickBack} />
        </HeaderElement>
        <HeaderElement style={{ alignItems: "center" }}>
          <TitleText>FILTER</TitleText>
        </HeaderElement>
        <HeaderElement style={{ alignItems: "flex-end" }}>
          <ButtonText title="Speichern" onPress={this.onSave} />
        </HeaderElement>
      </Wrapper>
    );
  }
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
