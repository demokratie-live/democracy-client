import PushNotification from "react-native-push-notification";
import {
  PushNotificationIOS,
  AsyncStorage,
  Alert,
  Linking
} from "react-native";
import Config from "react-native-config";
import { Navigation } from "react-native-navigation";

import client from "../graphql/client";

import ADD_TOKEN from "../graphql/mutations/addToken";

let clientToken = false;

const configure = async () => {
  PushNotification.configure({
    async onRegister({ token, os }) {
      console.log({ token });
      clientToken = {
        token,
        os
      };
      console.log("AsyncStorage.getItem", await AsyncStorage.getItem("push-token"))
      if(!await AsyncStorage.getItem("push-token")) {
        sendToken();
      }
    },

    onNotification = async (notification) => {
      console.log({ notification });
      // process the notification

      const {
        foreground,
        data: { action, title, message, procedureId }
      } = notification;

      console.log(
        "Navigation.getCurrentlyVisibleScreenId()",
        await Navigation.getCurrentlyVisibleScreenId().then(result => {console.log(result); return result})
      );

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
  console.log("sendToken", !!clientToken)
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
