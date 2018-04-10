import PushNotification from "react-native-push-notification";
import { PushNotificationIOS, AsyncStorage } from "react-native";
import Config from "react-native-config";

import client from "../graphql/client";

import ADD_TOKEN from "../graphql/mutations/addToken";

const configure = () => {
  PushNotification.configure({
    async onRegister({ token, os }) {
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
    },

    onNotification(notification) {
      // process the notification
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

export { configure }; // eslint-disable-line
