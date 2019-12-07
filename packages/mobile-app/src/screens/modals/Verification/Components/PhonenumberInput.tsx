import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  border-bottom-width: 1;
  border-color: #979797;
  padding-bottom: 0;
  flex-direction: row;
  margin-horizontal: 9;
  max-width: 300;
`;

const CountryNumber = styled.Text`
  font-size: 24;
  margin-bottom: 0;
  padding-bottom: 0;
  padding-top: ${Platform.OS === 'ios' ? 0 : 7};
`;

const Number = styled.TextInput.attrs(() => ({
  placeholder: 'Deine Telefonnr.',
  keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
  maxLength: 13,
  returnKeyType: 'next',
}))`
  flex: 1;
  font-size: 24;
  margin-bottom: 0;
  padding-bottom: 0;
  margin-left: 11;
`;

interface Props {
  phoneNumber: string;
  onChange: (phoneNumber: string) => void;
}

export const PhonenumberInput: React.FC<Props> = ({
  phoneNumber = '',
  onChange,
}) => {
  const onChangeText = (text: string) => {
    const formattedPhoneNumber = text.replace(/[^0-9]/g, '');
    onChange(formattedPhoneNumber);
  };

  return (
    <Container>
      <CountryNumber>+49</CountryNumber>
      <Number
        multiline={false}
        autoFocus
        onChangeText={onChangeText}
        value={phoneNumber}
        textContentType="telephoneNumber"
        underlineColorAndroid="transparent"
      />
    </Container>
  );
};

export default PhonenumberInput;
