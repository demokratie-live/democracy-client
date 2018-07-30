import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, Keyboard, Alert } from "react-native";
import { Navigator } from "react-native-navigation";

import Description from "./Components/Description";
import PhonenumberInput from "./Components/PhonenumberInput";
import Button from "./Components/Button";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
})``;

class SmsVerification extends Component {
  static navigatorStyle = {
    // navBarHidden: true,
    orientation: "landscape"
  };

  state = {
    height: Dimensions.get("window").height,
    keyboardHeight: 0,
    phoneNumber: ""
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this.keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.keyboardDidHide
    );
    this.props.navigator.setTitle({
      title: "Verifizieren".toUpperCase() // the new title of the screen as appears in the nav bar
    });
  }

  onLayout = e => {
    this.setState({ height: e.nativeEvent.layout.height });
  };

  onChangePhoneNumber = phoneNumber => {
    this.setState({ phoneNumber });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  keyboardDidShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  sendNumber = () => {
    Alert.alert(
      "Bestätigung der Telefonnummer",
      `+49 ${this.state.phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ja",
          onPress: () =>
            this.props.navigator.push({
              screen: "democracy.SmsVerification.Code",
              backButtonTitle: "Zurück",
              passProps: {
                phoneNumber: this.state.phoneNumber
              }
            })
        }
      ]
    );
  };

  render() {
    const { phoneNumber } = this.state;
    const height = this.state.height - this.state.keyboardHeight;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          height,
          alignItems: "center",
          justifyContent: "space-around",
          marginHorizontal: 9
        }}
        onLayout={this.onLayout}
      >
        <Description text="Bitte gib Deine aktuelle Handynummer ein" />
        <PhonenumberInput
          value={phoneNumber}
          onChange={this.onChangePhoneNumber}
        />
        <Button
          title="CODE ANFORDERN"
          onPress={this.sendNumber}
          style={{ width: "100%" }}
          disabled={phoneNumber.length < 10}
        />
      </ScrollView>
    );
  }
}

SmsVerification.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default SmsVerification;
