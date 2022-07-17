import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { Keyboard, Alert, Dimensions } from 'react-native';
import { sha256 } from 'react-native-sha256';
import AsyncStorage from '@react-native-community/async-storage';
import Description from './Components/Description';
import CodeInput from './Components/CodeInput';
import { useNavigation, RouteProp } from '@react-navigation/core';
import { ButtonNext } from './Start';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes';
import { VerificationContext } from '../../api/state/Verification';
import { useListFilter } from '../../api/hooks/useListFilter';
import { useRecoilValue } from 'recoil';
import { constituencyState } from '../../api/state/constituency';
import {
  ProcedureDocument,
  ProceduresListDocument,
  useRequestSmsCodeMutation,
  useRequestVerificationMutation,
} from '../../__generated__/graphql';
import { parlaments, parlamentState } from '../../api/state/parlament';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SvgIconappios from '../../components/Icons/IconAppIos';

const Container = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 400,
  },
}))``;

type DevPlaceholderNavigationProps = NativeStackNavigationProp<RootStackParamList, 'SmsCodeInput'>;

const DEVICE_HEIGT = Dimensions.get('window').height;

type RouteProps = RouteProp<RootStackParamList, 'SmsCodeInput'>;

interface Props {
  route: RouteProps;
}

export const SmsCodeInput: React.FC<Props> = ({ route }) => {
  const { countdown, setExpireTime, setResendTime, phoneNumber } = useContext(VerificationContext);
  const { proceduresFilter } = useListFilter();
  const constituency = useRecoilValue(constituencyState);
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  const [requestCode] = useRequestSmsCodeMutation();
  const [requestVerification] = useRequestVerificationMutation();
  const [code, setCode] = useState('');
  const parlamentIdentifier = useRecoilValue(parlamentState);
  const parlament = parlaments[parlamentIdentifier];

  const showNotification = (message: string) => {
    Alert.alert('Verifikationsfehler', message);
  };

  const onChangeCode = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 6) {
      const phoneNumberHash = await sha256(phoneNumber);
      const refetchQueries = [];
      if (route.params && route.params.procedureId) {
        // Detail View
        refetchQueries.push({
          query: ProcedureDocument,
          variables: {
            constituency,
            id: route.params.procedureId,
          },
        });
      }
      // Lists
      ['CONFERENCEWEEKS_PLANNED', 'PAST', 'TOP100'].forEach(list => {
        refetchQueries.push({
          query: ProceduresListDocument,
          variables: {
            period: parlament.period,
            listTypes: [list],
            pageSize: 10,
            filter: proceduresFilter,
            constituencies: constituency ? [constituency] : [],
          },
        });
      });
      const res = await requestVerification({
        variables: {
          code: newCode,
          newPhoneHash: phoneNumberHash,
          newUser: true, // TODO ask user if he already used the App with same phone number
        },
        refetchQueries,
      });

      if (res.data && res.data.requestVerification.succeeded) {
        AsyncStorage.setItem('auth_phoneHash', phoneNumberHash);
        AsyncStorage.removeItem('verification_tmp_phone_number');
        Keyboard.dismiss();
        navigation.navigate('SmsDonate');
      } else if (res.data) {
        showNotification(res.data.requestVerification.reason || '');
      }
    }
  };

  const sendNumber = () => {
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
          onPress: () => {
            requestCode({
              variables: { newPhone: phoneNumber },
            }).then(res => {
              if (res.data) {
                const { succeeded, reason, expireTime, resendTime } = res.data.requestCode;
                if (!succeeded) {
                  showNotification(reason || '');
                } else {
                  if (expireTime && resendTime) {
                    setExpireTime(expireTime);
                    setResendTime(resendTime);
                  }
                }
              }
            });
          },
        },
      ],
    );
  };

  let buttonTitle = 'Code erneut senden';
  if (countdown > 0) {
    buttonTitle += ` (${countdown})`;
  }

  return (
    <Container>
      {DEVICE_HEIGT > 500 && <SvgIconappios width={100} height={100} />}
      <Description text={`Bitte gib Deinen Code ein für\n${phoneNumber}`} />
      <CodeInput
        onChange={code => {
          onChangeCode(code);
        }}
        code={code}
      />
      <ButtonNext
        text={buttonTitle}
        onPress={sendNumber}
        disabled={countdown === undefined || countdown > 0}
        textColor="white"
        backgroundColor="blue"
      />
    </Container>
  );
};
