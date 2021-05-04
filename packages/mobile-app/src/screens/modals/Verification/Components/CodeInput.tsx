import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  border-bottom-width: 1px;
  border-color: #979797;
  padding-bottom: 0px;
  flex-direction: row;
  margin-horizontal: 9px;
  max-width: 300px;
`;

const Number = styled.TextInput.attrs(() => ({
  placeholder: 'XXXXXX',
  keyboardType: Platform.OS === 'ios' ? 'number-pad' : 'numeric',
  maxLength: 6,
  returnKeyType: 'next',
}))`
  flex: 1;
  font-size: 24px;
  color: #000;
  text-align: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
`;

interface Props {
  code: string;
  onChange: (code: string) => void;
}

export const CodeInput: React.FC<Props> = ({ code, onChange }) => {
  const onChangeText = (text: string) => {
    const formattedCode = text.replace(/[^0-9]/g, '');
    onChange(formattedCode);
  };

  return (
    <Container>
      <Number
        multiline={false}
        autoFocus
        onChangeText={onChangeText}
        value={code}
        underlineColorAndroid="transparent"
        testID="VerificationCodeInput"
      />
    </Container>
  );
};

export default CodeInput;
