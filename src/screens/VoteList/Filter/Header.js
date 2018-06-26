import React, { Component } from "react";
import { Platform } from "react-native";
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
  padding-right: ${Platform.OS === "android" ? 11 : 0};
`;

const TitleText = styled.Text.attrs({})`
  font-size: 17;
  color: #fff;
  font-weight: bold;
`;

const Button = styled.TouchableOpacity``;

const ButtonText = styled.Text`
  font-size: 17;
  color: #fff;
`;

class Header extends Component {
  onSave = async () => {
    await this.props.onSave();
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
        {Platform.OS === "ios" && (
          <HeaderElement style={{ alignItems: "flex-start" }}>
            <Button onPress={this.clickBack}>
              <ButtonText>Zurück</ButtonText>
            </Button>
          </HeaderElement>
        )}
        <HeaderElement style={{ alignItems: "center" }}>
          <TitleText>FILTER</TitleText>
        </HeaderElement>
        <HeaderElement style={{ alignItems: "flex-end" }}>
          <Button onPress={this.onSave}>
            <ButtonText>Speichern</ButtonText>
          </Button>
        </HeaderElement>
      </Wrapper>
    );
  }
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
