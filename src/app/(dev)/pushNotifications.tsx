import { useState, useRef, useEffect } from "react";
import { View, Button, Text } from "react-native";
import * as Notifications from "expo-notifications";
import {
  registerForPushNotificationsAsync,
  sendPushNotification,
} from "../../lib/pushNotifications";

export default function PushNotifications() {
  const [pushToken, setPushToken] = useState("");
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then((token) => setPushToken(token ?? ""))
      .catch((error: any) => setPushToken(`${error}`));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        notificationListener.current.remove();
      responseListener.current &&
        responseListener.current.remove();
    };
  }, []);

  useEffect(() => {
    if (pushToken) {
      console.log("Push token: ", pushToken);
    }
  }, [pushToken]);

  return (
    <View
      style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}
    >
      <View>
        <Text>Your push token:</Text>
        <Text selectable>{pushToken}</Text>
      </View>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text>
          Title: {notification && notification.request.content.title}{" "}
        </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>
          Data:{" "}
          {notification && JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(pushToken);
        }}
      />
    </View>
  );
}
