import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex-direction: row;
  margin-horizontal: 9;
  max-width: 300;
`;

const NumberBox = styled.View`
  border-bottom-width: 1;
  border-color: #979797;
  padding-bottom: 3;
`;

const CountryNumber = styled.Text`
  font-size: 24;
`;

const Number = styled.TextInput.attrs({
  placeholder: "Deine Telefonnr.",
  keyboardType: "number-pad",
  maxLength: 13,
  returnKeyType: "next"
})`
  flex: 1;
  font-size: 24;
`;

class PhonenumberInput extends Component {
  state = {
    phoneNumber: this.props.value
  };

  onChange = text => {
    const phoneNumber = text.replace(/[^0-9]/g, "");
    this.setState({ phoneNumber: String(phoneNumber) }, () => {
      if (text !== phoneNumber) {
        this.forceUpdate();
      }
    });
    this.props.onChange(phoneNumber);
  };

  render() {
    const { phoneNumber } = this.state;
    const { editable } = this.props;
    return (
      <Wrapper>
        <NumberBox marginRight={23}>
          <CountryNumber>+49</CountryNumber>
        </NumberBox>
        <NumberBox style={{ flex: 1 }}>
          <Number
            editable={editable}
            multiline={false}
            width="100%"
            autoFocus
            onChangeText={this.onChange}
            value={phoneNumber}
            textContentType="telephoneNumber"
          />
        </NumberBox>
      </Wrapper>
    );
  }
}

PhonenumberInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  editable: PropTypes.bool
};

PhonenumberInput.defaultProps = {
  value: "",
  editable: true
};

export default PhonenumberInput;
