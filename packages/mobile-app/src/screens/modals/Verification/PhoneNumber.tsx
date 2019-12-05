import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Alert } from 'react-native';

import Description from './Components/Description';
import PhonenumberInput from './Components/PhonenumberInput';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';

import REQUEST_CODE from './graphql/mutation/requestCode';
import { useMutation } from '@apollo/react-hooks';
import { RequestSmsCode } from './graphql/mutation/__generated__/RequestSmsCode';
import AsyncStorage from '@react-native-community/async-storage';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))`
  background-color: #fff;
`;

interface Props {}

export const PhoneNumber: React.FC<Props> = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [requestCode, { data }] = useMutation<RequestSmsCode>(REQUEST_CODE);

  const sendNumber = () => {
    let preparedPhoneNumber = phoneNumber;
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
            AsyncStorage.setItem('auth_phone', preparedPhoneNumber);
            const res = await requestCode({
              variables: { newPhone: preparedPhoneNumber, newUser: true },
            });

            if (res.data && !res.data.requestCode.succeeded) {
              // TODO show notification of reason why it failed
              showNotification(res.data.requestCode.reason || '');
            } else if (data) {
              // TODO: Navigate to Code Input if aut_code_expires is not yet expired
              // Contains a Date (String)
              // Do not do the Nvaigation here - do it on the "openVerificationScreen"
              AsyncStorage.setItem(
                'auth_code_expires',
                data.requestCode.expireTime,
              );
              // TODO go to code input Screen
              // this.props.navigator.push({
              //   screen: 'democracy.SmsVerification.Code',
              //   backButtonTitle: 'Zurück',
              //   passProps: {
              //     resendTime: new Date(res.data.requestCode.resendTime),
              //     procedureId: this.props.procedureId,
              //     onComplete: this.props.onComplete,
              //   },
              // });
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
    <ScrollView keyboardShouldPersistTaps="always">
      <Description text="Bitte gib Deine aktuelle Handynummer ein" />
      <PhonenumberInput phoneNumber={phoneNumber} onChange={setPhoneNumber} />
      <Button
        text="CODE ANFORDERN"
        onPress={sendNumber}
        disabled={phoneNumber.length < 10}
        textColor="white"
        backgroundColor="blue"
      />
    </ScrollView>
  );
};
