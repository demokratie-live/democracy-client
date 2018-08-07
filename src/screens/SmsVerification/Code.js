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
import { graphql, compose } from "react-apollo";
import { sha256 } from "react-native-sha256";

import Description from "./Components/Description";
import CodeInput from "./Components/CodeInput";
import Button from "./Components/Button";

import REQUEST_VERIFICATION from "../../graphql/mutations/requestVerification";
import REQUEST_CODE from "../../graphql/mutations/requestCode";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
})`
  background-color: #fff;
`;

class Code extends Component {
  static navigatorStyle = {
    // navBarHidden: true,
    orientation: "landscape"
  };

  state = {
    height: Dimensions.get("window").height,
    keyboardHeight: 0,
    countdown: Math.ceil((this.props.resendTime.getTime() - (new Date()).getTime()) / 1000),
    phoneNumber: ''
  };

  componentDidMount() {
    const storedPhoneNumber = AsyncStorage.getItem('auth_phone');
    storedPhoneNumber.then((phoneNumber) => {
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

    this.startCountdown();
  }

  componentWillUnmount() {
    this.stopCountdown();
  }

  onLayout = e => {
    this.setState({ height: e.nativeEvent.layout.height });
  };

  onChangeCode = async code => {
    if (code.length === 6) {
      const phoneNumber = await AsyncStorage.getItem("auth_phone");
      const phoneNumberHash = await sha256(phoneNumber);
      const res = await this.props.requestVerification({
        variables: { code, newPhoneHash: phoneNumberHash }
      });
      if (res.data.requestVerification.succeeded) {
        AsyncStorage.setItem("auth_phoneHash", phoneNumberHash);
        Alert.alert("Deine Verifikation war erfolgreich", null, [
          {
            text: "Ok",
            onPress: () => this.props.navigator.dismissAllModals()
          }
        ]);
      } else {
        this.showNotification({ message: res.data.requestVerification.reason });
      }
    }
  };

  startCountdown() {
    this.countDownInterval = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 }, () => {
        if (this.state.countdown <= 0) {
          this.stopCountdown();
        }
      });
    }, 1000);
  };

  stopCountdown() {
    clearInterval(this.countDownInterval);
  };

  showNotification = ({ message }) => {
    Navigation.showInAppNotification({
      screen: "democracy.Notifications.InApp", // unique ID registered with Navigation.registerScreen
      passProps: {
        title: "Verifikationsfehler",
        description: message
      }, // simple serializable object that will pass as props to the in-app notification (optional)
      autoDismissTimerSec: 5 // auto dismiss notification in seconds
    });
  };

  keyboardDidShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  sendNumber = async () => {
    const phoneNumber = await AsyncStorage.getItem("auth_phone");
    Alert.alert(
      "Bestätigung der Telefonnummer",
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => this.props.navigator.pop(),
          style: "cancel"
        },
        {
          text: "Ja",
          onPress: async () => {
            const res = await this.props.requestCode({
              variables: { newPhone: phoneNumber, newUser: true }
            });
            if (!res.data.requestCode.succeeded) {
              this.showNotification({ message: res.data.requestCode.reason });
            }
            AsyncStorage.setItem('auth_code_expires', res.data.requestCode.expireTime)
            this.setState({ countdown: Math.ceil((new Date(res.data.requestCode.resendTime).getTime() - (new Date()).getTime()) / 1000) });
            this.startCountdown();
          }
        }
      ]
    );
  };

  render() {
    const { countdown } = this.state;
    const height = this.state.height - this.state.keyboardHeight;

    let buttonTitle = "Code erneut senden";
    if (countdown > 0) {
      buttonTitle += ` (${countdown})`;
    }

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
        <Description text={`Bitte gib Deinen Code ein für\n${this.state.phoneNumber}`} />
        <CodeInput onChange={this.onChangeCode} />
        <Button
          title={buttonTitle}
          onPress={this.sendNumber}
          style={{ width: "100%" }}
          disabled={countdown > 0}
        />
      </ScrollView>
    );
  }
}

Code.propTypes = {
  requestVerification: PropTypes.func.isRequired,
  requestCode: PropTypes.func.isRequired,
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  resendTime: PropTypes.instanceOf(Date)
};

Code.defaultProps = {
  resendTime: new Date()
};

export default compose(
  graphql(REQUEST_VERIFICATION, { name: "requestVerification" }),
  graphql(REQUEST_CODE, { name: "requestCode" }),
)(Code);
