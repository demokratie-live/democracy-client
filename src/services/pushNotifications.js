import PushNotification from "react-native-push-notification";
import { PushNotificationIOS, AsyncStorage } from "react-native";

import client from "../graphql/client";

import ADD_TOKEN from "../graphql/mutations/addToken";

const configure = () => {
  PushNotification.configure({
    async onRegister({ token, os }) {
      // process token
      console.log("onRegister", token, os);
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
      console.log("onNotification", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true
    },

    popInitialNotification: true,
    requestPermissions: true
  });
};

export { configure };
