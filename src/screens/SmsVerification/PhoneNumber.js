import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { AsyncStorage, Dimensions, Keyboard, Alert } from "react-native";
import { Navigator } from "react-native-navigation";
import { graphql } from "react-apollo";

import Description from "./Components/Description";
import PhonenumberInput from "./Components/PhonenumberInput";
import Button from "./Components/Button";

import REQUEST_CODE from '../../graphql/mutations/requestCode';

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
    let { phoneNumber } = this.state;
    if (phoneNumber.charAt(0) === '0') {
      phoneNumber = phoneNumber.substr(1);
    }
    const fullPhoneNumber = `0049${phoneNumber}`;
    Alert.alert(
      "Bestätigung der Telefonnummer",
      `+49 ${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ja",
          onPress: async () => {
            AsyncStorage.setItem("auth_phone",phoneNumber);
            const res = await this.props.requestCode({variables: {newPhone: fullPhoneNumber}});
            console.log(res);
            return this.props.navigator.push({
              screen: "democracy.SmsVerification.Code",
              backButtonTitle: "Zurück",
              passProps: {
                resendTime: res.data.requestCode.resendTime
              }
            });
          }
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

export default graphql(REQUEST_CODE,{name: 'requestCode'})(SmsVerification);
