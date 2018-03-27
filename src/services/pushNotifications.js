import PushNotification from "react-native-push-notification";
import { PushNotificationIOS, AsyncStorage } from "react-native";

const configure = () => {
  PushNotification.configure({
    async onRegister({ token, os }) {
      // process token
      console.log("onRegister", token, os);
      await AsyncStorage.setItem("push-token", token);
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
