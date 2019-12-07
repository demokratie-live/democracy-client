import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import Description from './Components/Description';
import PhonenumberInput from './Components/PhonenumberInput';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

import REQUEST_CODE from './graphql/mutation/requestCode';
import { useMutation } from '@apollo/react-hooks';
import {
  RequestSmsCode,
  RequestSmsCodeVariables,
} from './graphql/mutation/__generated__/RequestSmsCode';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { VerificationRootStackParamList } from '../../../routes/Verification';
import { VerificationContext } from '../../../context/Verification';

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: 'padding',
  keyboardVerticalOffset: 100,
  // enabled: true,
}))`
  background-color: #fff;
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  keyboardShouldPersistTaps: 'always',
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
}))``;

interface Props {}

export const PhoneNumber: React.FC<Props> = () => {
  const navigation = useNavigation<
    StackNavigationProp<VerificationRootStackParamList>
  >();
  const {
    phoneNumber,
    setPhoneNumber,
    setExpireTime,
    setResendTime,
  } = useContext(VerificationContext);
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(
    phoneNumber.substr(3),
  );
  const [requestCode] = useMutation<RequestSmsCode, RequestSmsCodeVariables>(
    REQUEST_CODE,
  );

  const sendNumber = () => {
    let preparedPhoneNumber = phoneNumberInputValue;
    if (preparedPhoneNumber.charAt(0) === '0') {
      preparedPhoneNumber = preparedPhoneNumber.substr(1);
    }
    preparedPhoneNumber = `+49${preparedPhoneNumber}`;
    Alert.alert(
      'Bestätigung der Telefonnummer',
      `${preparedPhoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: 'Bearbeiten',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: async () => {
            setPhoneNumber(preparedPhoneNumber);
            const res = await requestCode({
              variables: { newPhone: preparedPhoneNumber },
            });
            if (res.data && !res.data.requestCode.succeeded) {
              setExpireTime(res.data.requestCode.expireTime);
              setResendTime(res.data.requestCode.resendTime);
              showNotification(res.data.requestCode.reason || '');
            } else if (res.data) {
              // TODO: Navigate to Code Input if aut_code_expires is not yet expired
              // Contains a Date (String)
              setExpireTime(res.data.requestCode.expireTime);
              setResendTime(res.data.requestCode.resendTime);
              navigation.push('SmsCodeInput');
            }
          },
        },
      ],
    );
  };

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

  return (
    <Container>
      <ScrollView>
        <Description text="Bitte gib Deine aktuelle Handynummer ein" />
        <PhonenumberInput
          phoneNumber={phoneNumberInputValue}
          onChange={setPhoneNumberInputValue}
        />
        <Button
          text="CODE ANFORDERN"
          onPress={sendNumber}
          disabled={phoneNumberInputValue.length < 10}
          textColor="white"
          backgroundColor="blue"
        />
      </ScrollView>
    </Container>
  );
};
