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
import { Navigator } from "react-native-navigation";
import { graphql } from "react-apollo";
import { sha256 } from "react-native-sha256";

import Description from "./Components/Description";
import CodeInput from "./Components/CodeInput";
import Button from "./Components/Button";

import REQUEST_VERIFICATION from "../../graphql/mutations/requestVerification";

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
    countdown: this.props.resendTime,
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

    this.countDownInterval = setInterval(() => {
      this.setState({ countdown: this.state.countdown - 1 }, () => {
        if (this.state.countdown <= 0) {
          clearInterval(this.countDownInterval);
        }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.countDownInterval);
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
      console.log(res);
      if (res.data.requestVerification.succeeded) {
        AsyncStorage.setItem("auth_phoneHash", phoneNumberHash);
        Alert.alert("Deine Verifikation war erfolgreich", null, [
          {
            text: "Ok",
            onPress: () => this.props.navigator.dismissAllModals()
          }
        ]);
      }
    }
  };

  keyboardDidShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  sendNumber = () => {
    const phoneNumber = AsyncStorage.getItem("auth_phone");
    Alert.alert(
      "Bestätigung der Telef  onnummer",
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => this.props.navigator.pop(),
          style: "cancel"
        },
        { text: "Ja", onPress: () => console.log("OK Pressed") }
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
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  resendTime: PropTypes.number
};

Code.defaultProps = {
  resendTime: 0
};

export default graphql(REQUEST_VERIFICATION, { name: "requestVerification" })(
  Code
);
