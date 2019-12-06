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
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import { VerificationRootStackParamList } from '../../../routes/Verification';
import { Button } from '@democracy-deutschland/mobile-ui/src/components/Button';
// import GET_PROCEDURE from '../../graphql/queries/getProcedure';
// import F_PROCEDURE_VERIFIED from '../../graphql/fragments/ProcedureVerified';
// import GET_STATISTIC from '../../graphql/queries/getStatistic';

const ScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))`
  background-color: #fff;
`;

export const Code: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<VerificationRootStackParamList>
  >();
  const [requestCode] = useMutation<RequestSmsCode, RequestSmsCodeVariables>(
    REQUEST_CODE,
  );
  const [requestVerification] = useMutation<
    RequestVerification,
    RequestVerificationVariables
  >(REQUEST_VERIFICATION);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  // const [countdown, setCountdown] = useState<number>(0);
  // let COUNTDOWN_INTERVAL: NodeJS.Timeout;

  // did Mount
  useEffect(() => {
    // Setup Countdown
    // AsyncStorage.getItem('auth_code_resend_time').then(resendTime => {
    //   const resendTimeDate = resendTime ? new Date(resendTime) : new Date();
    //   const countdownValue = Math.ceil(
    //     (resendTimeDate.getTime() - new Date().getTime()) / 1000,
    //   );
    //   if (countdownValue > 0) {
    //     setCountdown(countdownValue);
    //     startCountdown();
    //   }
    // });

    // Setup Phone Number
    AsyncStorage.getItem('auth_phone').then(value => {
      setPhoneNumber(value || '');
    });

    // return () => {
    //   stopCountdown();
    // };
  }, []);

  const onChangeCode = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 6) {
      const phoneNumberHash = await sha256(phoneNumber || '');
      console.log({ newCode, newPhoneHash: phoneNumberHash });
      const res = await requestVerification({
        variables: { code: newCode, newPhoneHash: phoneNumberHash },
      });

      if (res.data && res.data.requestVerification.succeeded) {
        AsyncStorage.setItem('auth_phoneHash', phoneNumberHash);
        Keyboard.dismiss();
        navigation.pop();
        // this.props.navigator.push({
        //   screen: 'democracy.SmsVerification.Success',
        //   backButtonTitle: 'Zurück',
        //   passProps: {
        //     onComplete: this.props.onComplete,
        //   },
        //   navigatorStyle: { navBarHidden: true },
        // });
      } else if (res.data) {
        showNotification(res.data.requestVerification.reason || '');
      }
    }
  };

  // const startCountdown = () => {
  //   if (COUNTDOWN_INTERVAL) {
  //     this.stopCountdown();
  //   }
  //   COUNTDOWN_INTERVAL = setInterval(() => {
  //     this.setState({ countdown: this.state.countdown - 1 }, () => {
  //       if (this.state.countdown <= 0) {
  //         this.stopCountdown();
  //       }
  //     });
  //   }, 1000);
  // };

  // const stopCountdown = () => {
  //   clearInterval(COUNTDOWN_INTERVAL);
  // };

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
                AsyncStorage.setItem('auth_code_expires', expireTime);
                AsyncStorage.setItem('auth_code_resend_time', resendTime);
              }
            }

            // this.setState({
            //   countdown: Math.ceil(
            //     (new Date(resendTime).getTime() - new Date().getTime()) / 1000,
            //   ),
            // });
            // this.startCountdown();
          },
        },
      ],
    );
  };

  let buttonTitle = 'Code erneut senden';
  // if (countdown > 0) {
  //   buttonTitle += ` (${countdown})`;
  // }

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <Description text={`Bitte gib Deinen Code ein für\n${phoneNumber}`} />
      <CodeInput onChange={onChangeCode} code={code} />
      <Button
        text={buttonTitle}
        onPress={sendNumber}
        // disabled={countdown > 0}
        textColor="white"
        backgroundColor="blue"
      />
    </ScrollView>
  );
};

// export default compose(
//   graphql(REQUEST_VERIFICATION, {
//     props({ mutate, ownProps: { procedureId } }) {
//       return {
//         requestVerification: args =>
//           mutate({
//             ...args,
//             update: (cache, { data }) => {
//               if (procedureId) {
//                 const aiFragment = cache.readFragment({
//                   id: procedureId,
//                   fragment: F_PROCEDURE_VERIFIED,
//                 });

//                 aiFragment.verified = data.requestVerification.succeeded;

//                 cache.writeFragment({
//                   id: procedureId,
//                   fragment: F_PROCEDURE_VERIFIED,
//                   data: aiFragment,
//                 });
//               }
//               return { data };
//             },
//             refetchQueries: [
//               {
//                 query: GET_PROCEDURE,
//                 variables: {
//                   id: procedureId,
//                 },
//               },
//               {
//                 query: GET_STATISTIC,
//               },
//             ],
//           }),
//       };
//     },
//   }),
//   graphql(REQUEST_CODE, { name: 'requestCode' }),
// )(Code);
