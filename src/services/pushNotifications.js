import PushNotification from "react-native-push-notification";
import { PushNotificationIOS, AsyncStorage, Alert } from "react-native";
import Config from "react-native-config";
import { Navigation } from "react-native-navigation";

import client from "../graphql/client";

import ADD_TOKEN from "../graphql/mutations/addToken";

let clientToken = false;

const configure = async () => {
  PushNotification.configure({
    onRegister: async ({ token, os }) => {
      clientToken = {
        token,
        os
      };
      if (!await AsyncStorage.getItem("push-token")) {
        sendToken();
      }
    },

    onNotification: async notification => {
      // process the notification

      const {
        foreground,
        data: { action, title, message, procedureId }
      } = notification;

      switch (action) {
        case "procedureDetails":
          if (foreground) {
            Alert.alert(title, message, [
              {
                text: "Anschauen",
                onPress: () => {
                  Navigation.handleDeepLink({
                    link: `democracy.Detail`,
                    payload: {
                      procedureId
                    }
                  });
                }
              },
              {
                text: "Ok",
                style: "cancel"
              }
            ]);
          } else {
            Navigation.handleDeepLink({
              link: `democracy.Detail`,
              payload: {
                procedureId
              }
            });
          }
          break;

        default:
          break;
      }
      // required on iOS only
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    senderID: Config.NOTIFICATION_ANDROID_SENDER_ID,

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  });
};

const sendToken = async () => {
  if (clientToken) {
    const { token, os } = clientToken;
    // process token
    const tokenSucceeded = await client.mutate({
      mutation: ADD_TOKEN,
      variables: {
        token,
        os
      }
    });
    if (tokenSucceeded) {
      await AsyncStorage.setItem("push-token", token);
    }
  }
};

export { configure, sendToken }; // eslint-disable-line
