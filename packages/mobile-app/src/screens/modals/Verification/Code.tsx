import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Alert } from 'react-native';
import { sha256 } from 'react-native-sha256';
import AsyncStorage from '@react-native-community/async-storage';

import Description from './Components/Description';
import CodeInput from './Components/CodeInput';
import { useEffect } from 'react';

// GraphQL
import REQUEST_CODE from './graphql/mutation/requestCode';
import REQUEST_VERIFICATION from './graphql/mutation/requestVerification';
import {
  RequestVerification,
  RequestVerificationVariables,
} from './graphql/mutation/__generated__/RequestVerification';
import { useMutation } from '@apollo/react-hooks';
import {
  RequestSmsCode,
  RequestSmsCodeVariables,
} from './graphql/mutation/__generated__/RequestSmsCode';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { VerificationRootStackParamList } from '../../../routes/Verification';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
import { RootStackParamList } from '../../../routes';
import Me from '../../../context/InitialStates/graphql/query/Me';

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: 'padding',
  keyboardVerticalOffset: 100,
  // enabled: true,
}))`
  background-color: #fff;
  flex: 1;
`;

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
  },
}))``;

type DevPlaceholderNavigationProps = CompositeNavigationProp<
  StackNavigationProp<VerificationRootStackParamList, 'SmsCodeInput'>,
  StackNavigationProp<RootStackParamList>
>;

export const Code: React.FC = () => {
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  const [requestCode] = useMutation<RequestSmsCode, RequestSmsCodeVariables>(
    REQUEST_CODE,
  );
  const [requestVerification] = useMutation<
    RequestVerification,
    RequestVerificationVariables
  >(REQUEST_VERIFICATION, {
    refetchQueries: [{ query: Me }],
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState<number>();
  const [resendTime, setResendTime] = useState<Date>(new Date());

  // did Mount
  useEffect(() => {
    // Setup Countdown
    AsyncStorage.getItem('verification_code_resend_time').then(time => {
      const resendTimeDate = time ? new Date(time) : new Date();
      setResendTime(resendTimeDate);
    });

    // Setup Phone Number
    AsyncStorage.getItem('auth_phone').then(value => {
      setPhoneNumber(value || '');
    });
  }, []);

  useEffect(() => {
    const countdownValue = Math.ceil(
      (resendTime.getTime() - new Date().getTime()) / 1000,
    );
    if (countdownValue > 0) {
      const countdownInterval = setInterval(() => {
        setCountdown(
          Math.ceil((resendTime.getTime() - new Date().getTime()) / 1000),
        );
      }, 1000);
      return () => {
        clearInterval(countdownInterval);
      };
    }
  }, [resendTime]);

  const onChangeCode = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 6) {
      const phoneNumberHash = await sha256(phoneNumber || '');
      console.log({ newCode, newPhoneHash: phoneNumberHash });
      const res = await requestVerification({
        variables: {
          code: newCode,
          newPhoneHash: phoneNumberHash,
          newUser: true, // TODO ask user if he already used the App with same phone number
        },
      });

      if (res.data && res.data.requestVerification.succeeded) {
        AsyncStorage.setItem('auth_phoneHash', phoneNumberHash);
        Keyboard.dismiss();
        navigation.resetRoot();
      } else if (res.data) {
        showNotification(res.data.requestVerification.reason || '');
      }
    }
  };

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

  const sendNumber = async () => {
    Alert.alert(
      'Bestätigung der Telefonnummer',
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: 'Bearbeiten',
          onPress: () => navigation.pop(),
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: async () => {
            const res = await requestCode({
              variables: { newPhone: phoneNumber },
            });
            if (res.data) {
              const {
                succeeded,
                reason,
                expireTime,
                resendTime,
              } = res.data.requestCode;
              if (!succeeded) {
                showNotification(reason || '');
              } else {
                AsyncStorage.setItem(
                  'verification_code_expire_time',
                  expireTime,
                );
                AsyncStorage.setItem(
                  'verification_code_resend_time',
                  resendTime,
                );
                setResendTime(new Date(resendTime));
              }
            }
          },
        },
      ],
    );
  };

  let buttonTitle = 'Code erneut senden';
  if (countdown === undefined || countdown > 0) {
    buttonTitle += ` (${countdown})`;
  }

  return (
    <Container>
      <ScrollView keyboardShouldPersistTaps="always">
        <Description text={`Bitte gib Deinen Code ein für\n${phoneNumber}`} />
        <CodeInput onChange={onChangeCode} code={code} />
        <Button
          text={buttonTitle}
          onPress={sendNumber}
          disabled={countdown === undefined || countdown > 0}
          textColor="white"
          backgroundColor="blue"
        />
      </ScrollView>
    </Container>
  );
};
