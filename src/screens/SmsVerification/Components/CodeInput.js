import React, { Component } from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex-direction: row;
  margin-horizontal: 9;
  max-width: 150;
  height: 40;
`;

const NumberBox = styled.View`
  border-bottom-width: 1;
  border-color: #979797;
  padding-bottom: 3;
  justify-content: center;
  height: 40;
`;

const Number = styled.TextInput.attrs({
  placeholder: "XXXXXX",
  keyboardType: Platform.OS === "ios" ? "number-pad" : "numeric",
  maxLength: 6,
  returnKeyType: "next"
})`
  flex: 1;
  font-size: 24;
  text-align: center;
  margin-bottom: 0;
  padding-bottom: 0;
`;

class CodeInput extends Component {
  state = {
    code: this.props.value
  };

  onChange = text => {
    const code = text.replace(/[^0-9]/g, "");
    this.setState({ code: String(code) }, () => {
      if (text !== code) {
        this.forceUpdate();
      }
    });
    this.props.onChange(code);
  };

  render() {
    const { code } = this.state;
    const { editable } = this.props;
    return (
      <Wrapper>
        <NumberBox style={{ flex: 1 }}>
          <Number
            editable={editable}
            multiline={false}
            width="100%"
            autoFocus
            onChangeText={this.onChange}
            value={code}
            underlineColorAndroid="transparent"
          />
        </NumberBox>
      </Wrapper>
    );
  }
}

CodeInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

CodeInput.defaultProps = {
  value: "",
  editable: true
};

export default CodeInput;
