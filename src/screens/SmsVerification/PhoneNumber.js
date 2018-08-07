import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  AsyncStorage,
  Dimensions,
  Keyboard,
  Alert,
  Platform
} from "react-native";
import { Navigator, Navigation } from "react-native-navigation";
import { graphql } from "react-apollo";

import Description from "./Components/Description";
import PhonenumberInput from "./Components/PhonenumberInput";
import Button from "./Components/Button";

import REQUEST_CODE from "../../graphql/mutations/requestCode";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
})`
  background-color: #fff;
`;

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
    const storedPhoneNumber = AsyncStorage.getItem('auth_phone');
    storedPhoneNumber.then((phoneNumber) => {
      phoneNumber = phoneNumber.substr(3); //eslint-disable-line
      this.setState({
        phoneNumber
      });
    });

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

  // TODO: One of those functions causes unmounted warning
  keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  // TODO: One of those functions causes unmounted warning
  keyboardDidShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  sendNumber = () => {
    let { phoneNumber } = this.state;
    if (phoneNumber.charAt(0) === "0") {
      phoneNumber = phoneNumber.substr(1);
    }
    phoneNumber = `+49${phoneNumber}`;
    Alert.alert(
      "Bestätigung der Telefonnummer",
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Ja",
          onPress: async () => {
            AsyncStorage.setItem("auth_phone", phoneNumber);
            const res = await this.props.requestCode({
              variables: { newPhone: phoneNumber, newUser: true }
            });
            if (!res.data.requestCode.succeeded) {
              this.showNotification({ message: res.data.requestCode.reason });
            }
            // TODO: Navigate to Code Input if aut_code_expires is not yet expired
            // Contains a Date (String)
            // Do not do the Nvaigation here - do it on the "openVerificationScreen"
            AsyncStorage.setItem('auth_code_expires', res.data.requestCode.expireTime)
            this.props.navigator.push({
              screen: "democracy.SmsVerification.Code",
              backButtonTitle: "Zurück",
              passProps: {
                resendTime: new Date(res.data.requestCode.resendTime)
              }
            });
          }
        }
      ]
    );
  };

  showNotification = ({ message }) => {
    Navigation.showInAppNotification({
      screen: "democracy.SmsVerification.Error", // unique ID registered with Navigation.registerScreen
      passProps: {
        title: "Verifikationsfehler",
        description: message
      }, // simple serializable object that will pass as props to the in-app notification (optional)
      autoDismissTimerSec: 5 // auto dismiss notification in seconds
    });
  };

  render() {
    const { phoneNumber } = this.state;
    const height = this.state.height - this.state.keyboardHeight;
    return (
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          height: Platform.OS === "ios" ? height : "100%",
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
  requestCode: PropTypes.func.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired
};

export default graphql(REQUEST_CODE, { name: "requestCode" })(SmsVerification);
