import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-native";
import VotesLocal from "../lib/VotesLocal";
import styled from "styled-components/native";
import * as Notifications from "expo-notifications";
import { DevLogsScreen } from "./DevLogsScreen";

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DevScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [apnToken, setApnToken] = useState<string | null>(null);
  const [showLogsScreen, setShowLogsScreen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await Notifications.getExpoPushTokenAsync();
      setToken(data);
      const apnToken = await Notifications.getDevicePushTokenAsync();
      setApnToken(apnToken.data);
    })();
  }, []);

  return (
    <>
      <Button
        title="Local Logging"
        onPress={() => setShowLogsScreen(true)}
      />
      <Button
        title="Delete auth"
        onPress={() => {
          Alert.alert("Are you sure?", "This will delete all auth data", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                AsyncStorage.removeItem("auth_refreshToken");
                AsyncStorage.removeItem("auth_token");
                AsyncStorage.removeItem("auth_phoneHash");
                AsyncStorage.removeItem("verification_code_resend_time");
                AsyncStorage.removeItem("verification_code_expire_time");
                AsyncStorage.removeItem("verification_tmp_phone_number");
                Alert.alert("auth deleted");
              },
            },
          ]);
        }}
      />
      <Button
        title="Delete local votes"
        onPress={() => {
          // alert to confirm deletion
          Alert.alert("Are you sure?", "This will delete all local votes", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                VotesLocal.reset();
                Alert.alert("local votes deleted");
              },
            },
          ]);
        }}
      />
      <Button
        title="Delete all AsyncStorage data"
        onPress={() => {
          Alert.alert("Are you sure?", "This will delete the token", [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                AsyncStorage.clear();
                Alert.alert("AsyncStorage cleared");
              },
            },
          ]);
        }}
      />
      <Text>Token:</Text>
      <Text selectable>{token}</Text>
      <Text>APN Token:</Text>
      <Text selectable>{apnToken}</Text>

      <Modal
        visible={showLogsScreen}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLogsScreen(false)}
      >
        <DevLogsScreen onBack={() => setShowLogsScreen(false)} />
      </Modal>
    </>
  );
};

export default DevScreen;
