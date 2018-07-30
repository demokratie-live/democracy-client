import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { Dimensions, Keyboard, Alert } from "react-native";
import { Navigator } from "react-native-navigation";

import Description from "./Components/Description";
import CodeInput from "./Components/CodeInput";
import Button from "./Components/Button";

const ScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {
    alignItems: "center",
    justifyContent: "center"
  }
})``;

class Code extends Component {
  static navigatorStyle = {
    // navBarHidden: true,
    orientation: "landscape"
  };

  state = {
    height: Dimensions.get("window").height,
    keyboardHeight: 0,
    countdown: 10
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

  onChangeCode = code => {
    if (code.length === 6) {
      Alert.alert("Deine Verifikation war erfolgreich", null, [
        {
          text: "Ok",
          onPress: () => this.props.navigator.dismissAllModals()
        }
      ]);
    }
  };

  keyboardDidShow = e => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  sendNumber = () => {
    Alert.alert(
      "Bestätigung der Telef  onnummer",
      `+49 ${this.props.phoneNumber}\nIst diese Nummer korrekt?`,

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
          height,
          alignItems: "center",
          justifyContent: "space-around",
          marginHorizontal: 9
        }}
        onLayout={this.onLayout}
      >
        <Description text="Bitte gib deine aktuelle Handynummer ein" />
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
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  phoneNumber: PropTypes.string.isRequired
};

export default Code;
