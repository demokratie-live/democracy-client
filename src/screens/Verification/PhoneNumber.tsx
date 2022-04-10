import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Alert, Platform, Dimensions } from 'react-native';
import Description from './Components/Description';
import PhonenumberInput from './Components/PhonenumberInput';
import { useNavigation } from '@react-navigation/core';
import { ButtonNext } from './Start';
import { useInitialState } from '../../api/state/initialState';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { VerificationContext } from '../../api/state/Verification';
import { useRequestSmsCodeMutation } from '../../__generated__/graphql';
import SvgDemocracyBubble from '../../components/Icons/DemocracyBubble';

const Container = styled.KeyboardAvoidingView.attrs(() => ({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
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

const DEVICE_HEIGT = Dimensions.get('window').height;

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export const PhoneNumber: React.FC = () => {
  const { refetchMe } = useInitialState();
  const navigation = useNavigation<NavigationProps>();
  const { phoneNumber, setPhoneNumber, setExpireTime, setResendTime } =
    useContext(VerificationContext);
  const [phoneNumberInputValue, setPhoneNumberInputValue] = useState(phoneNumber.substr(3));
  const [requestCode] = useRequestSmsCodeMutation();

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

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
          style: 'cancel',
        },
        {
          text: 'Ja',
          onPress: () => {
            setPhoneNumber(preparedPhoneNumber);
            requestCode({
              variables: { newPhone: preparedPhoneNumber },
            }).then(({ data }) => {
              if (
                data &&
                !data.requestCode.succeeded &&
                data.requestCode.expireTime &&
                data.requestCode.resendTime
              ) {
                setExpireTime(data.requestCode.expireTime);
                setResendTime(data.requestCode.resendTime);
                showNotification(data.requestCode.reason || '');
                refetchMe();
              } else if (data && data.requestCode.expireTime && data.requestCode.resendTime) {
                // TODO: Navigate to Code Input if aut_code_expires is not yet expired
                // Contains a Date (String)
                setExpireTime(data.requestCode.expireTime);
                setResendTime(data.requestCode.resendTime);
                navigation.push('SmsCodeInput', {});
              }
            });
          },
        },
      ],
    );
  };

  return (
    <Container>
      <ScrollView>
        {DEVICE_HEIGT > 500 && <SvgDemocracyBubble width="125" height="125" color="#000" />}
        <Description text="Bitte gib Deine aktuelle Handynummer ein" />
        <PhonenumberInput phoneNumber={phoneNumberInputValue} onChange={setPhoneNumberInputValue} />
        <ButtonNext
          text="CODE ANFORDERN"
          onPress={sendNumber}
          disabled={phoneNumberInputValue.length < 9}
          textColor="white"
          backgroundColor="blue"
          testID="VerificationCodeButton"
        />
      </ScrollView>
    </Container>
  );
};
