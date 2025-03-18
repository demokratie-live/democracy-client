import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components/native";
import { Keyboard, Alert, Dimensions, ActivityIndicator, KeyboardAvoidingView } from "react-native";
import { sha256 } from "react-native-sha256";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Description from "./Components/Description";
import CodeInput from "./Components/CodeInput";
import { useNavigation } from "@react-navigation/core";
import { ButtonNext } from "./Start";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { VerificationContext } from "../../api/state/Verification";
import {
  useRequestSmsCodeMutation,
  useRequestVerificationMutation,
} from "../../__generated__/graphql";
import { AppLogo } from "../../components/AppLogo";
import { VerificationStackParamList } from "../../app/(verification)/_layout";

const Container = styled(KeyboardAvoidingView).attrs(() => ({
  behavior: "padding",
  keyboardVerticalOffset: 100,
}))`
  background-color: #fff;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 20px;
  height: 400px;
`;

type DevPlaceholderNavigationProps = NativeStackNavigationProp<
  VerificationStackParamList,
  "SmsCodeInput"
>;

const DEVICE_HEIGT = Dimensions.get("window").height;

export const SmsCodeInputScreen: React.FC = () => {
  const { countdown, setExpireTime, setResendTime, phoneNumber } =
    useContext(VerificationContext);
  const navigation = useNavigation<DevPlaceholderNavigationProps>();
  const [requestCode] = useRequestSmsCodeMutation();
  const [requestVerification, { loading }] = useRequestVerificationMutation();
  const [code, setCode] = useState("");

  useEffect(() => {
    navigation.setOptions({ headerBackVisible: !loading });
  }, [loading, navigation]);

  const showNotification = (message: string) => {
    Alert.alert("Verifikationsfehler", message);
  };

  const onChangeCode = async (newCode: string) => {
    setCode(newCode);
    if (newCode.length === 6) {
      const phoneNumberHash = await sha256(phoneNumber);
      const res = await requestVerification({
        variables: {
          code: newCode,
          newPhoneHash: phoneNumberHash,
          newUser: true, // TODO ask user if he already used the App with same phone number
        },
      });

      console.log(
        {
          code: newCode,
          newPhoneHash: phoneNumberHash,
          newUser: true, // TODO ask user if he already used the App with same phone number
        },
        res
      );

      if (res.data && res.data.requestVerification.succeeded) {
        AsyncStorage.setItem("auth_phoneHash", phoneNumberHash);
        AsyncStorage.removeItem("verification_tmp_phone_number");
        Keyboard.dismiss();
        navigation.navigate("SmsDonate");
      } else if (res.data) {
        showNotification(res.data.requestVerification.reason || "");
      }
    }
  };

  const sendNumber = () => {
    Alert.alert(
      "Bestätigung der Telefonnummer",
      `${phoneNumber}\nIst diese Nummer korrekt?`,

      [
        {
          text: "Bearbeiten",
          onPress: () => navigation.pop(),
          style: "cancel",
        },
        {
          text: "Ja",
          onPress: () => {
            requestCode({
              variables: { newPhone: phoneNumber },
            }).then((res) => {
              if (res.data) {
                const { succeeded, reason, expireTime, resendTime } =
                  res.data.requestCode;
                if (!succeeded) {
                  showNotification(reason || "");
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
      ]
    );
  };

  let buttonTitle = "Code erneut senden";
  if (countdown > 0) {
    buttonTitle += ` (${countdown})`;
  }

  return (
    <Container>
      {DEVICE_HEIGT > 500 && <AppLogo />}
      <Description text={`Bitte gib Deinen Code ein für\n${phoneNumber}`} />
      <CodeInput
        disabled={loading}
        onChange={(code) => {
          onChangeCode(code);
        }}
        code={code}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <ButtonNext
          onPress={sendNumber}
          disabled={countdown === undefined || countdown > 0}
          variant="primary"
        >
          {buttonTitle}
        </ButtonNext>
      )}
    </Container>
  );
};
