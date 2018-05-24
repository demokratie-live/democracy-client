import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import {
  DeviceEventEmitter,
  Platform,
  AsyncStorage,
  Alert
} from "react-native";
import NotificationsIOS, {
  NotificationsAndroid,
  PendingNotifications
} from "react-native-notifications";

import client from "../graphql/client";

import ADD_TOKEN from "../graphql/mutations/addToken";

let LISTENERS_ADDED = false;

export default ComposedComponent => {
  class WrappingComponent extends Component {
    constructor(props) {
      super(props);
      switch (Platform.OS) {
        case "ios":
          NotificationsIOS.addEventListener(
            "remoteNotificationsRegistered",
            this.onPushRegistered
          );
          NotificationsIOS.addEventListener(
            "remoteNotificationsRegistrationFailed",
            this.onPushRegistrationFailed
          );
          NotificationsIOS.requestPermissions();

          NotificationsIOS.addEventListener(
            "notificationReceivedForeground",
            notification => {
              this.onNotificationReceivedForeground(notification.getData());
            }
          );
          NotificationsIOS.addEventListener(
            "notificationReceivedBackground",
            this.notificationReceivedBackground
          );
          NotificationsIOS.addEventListener(
            "notificationOpened",
            notification => {
              this.onNotificationOpened(notification.getData());
            }
          );
          break;
        case "android":
          if (!LISTENERS_ADDED) {
            LISTENERS_ADDED = true;
            NotificationsAndroid.setRegistrationTokenUpdateListener(
              async deviceToken => {
                // TODO: Send the token to my server so it could send back push notifications...
                console.log("Push notifications registered!", deviceToken);
                const tokenSucceeded = await client.mutate({
                  mutation: ADD_TOKEN,
                  variables: {
                    token: deviceToken,
                    os: "android"
                  }
                });
                if (tokenSucceeded) {
                  await AsyncStorage.setItem("push-token", deviceToken);
                }
              }
            );

            // On Android, we allow for only one (global) listener per each event type.
            NotificationsAndroid.setNotificationReceivedListener(
              notification => {
                const { title, message, procedureId } = JSON.parse(
                  notification.getData().payload
                );

                this.onNotificationReceivedForeground({
                  title,
                  message,
                  procedureId
                });
              }
            );
            NotificationsAndroid.setNotificationOpenedListener(notification => {
              console.log(
                "Notification opened by device user 1",
                notification.getData()
              );

              const { title, message, procedureId } = JSON.parse(
                notification.getData().payload
              );
              this.onNotificationOpened({ title, message, procedureId });
            });

            PendingNotifications.getInitialNotification()
              .then(notification => {
                console.log(
                  "Initial notification was:",
                  notification ? notification.getData() : "N/A"
                );
                if (notification) {
                  const { title, message, procedureId } = JSON.parse(
                    notification.getData().payload
                  );
                  this.onNotificationOpened({ title, message, procedureId });
                }
              })
              .catch(err =>
                console.error("getInitialNotifiation() failed", err)
              );
          }
          break;
        default:
          break;
      }
    }

    componentDidMount() {
      switch (Platform.OS) {
        case "ios":
          NotificationsIOS.consumeBackgroundQueue();
          break;

        default:
          break;
      }
    }

    componentWillUnmount() {
      switch (Platform.OS) {
        case "ios":
          // prevent memory leaks!
          NotificationsIOS.removeEventListener(
            "remoteNotificationsRegistered",
            this.onPushRegistered
          );
          NotificationsIOS.removeEventListener(
            "remoteNotificationsRegistrationFailed",
            this.onPushRegistrationFailed
          );
          NotificationsIOS.removeEventListener(
            "notificationReceivedForeground",
            this.onNotificationReceivedForeground
          );
          NotificationsIOS.removeEventListener(
            "notificationReceivedBackground",
            this.onNotificationReceivedBackground
          );
          NotificationsIOS.removeEventListener(
            "notificationOpened",
            this.onNotificationOpened
          );
          break;

        default:
          break;
      }
    }

    onNotificationReceivedForeground = notification => {
      console.log("Notification Received - Foreground", notification);

      const { navigator } = this.props;
      const { title, message, procedureId } = notification;

      Alert.alert(title, message, [
        {
          text: "Anschauen",
          onPress: () => {
            navigator.handleDeepLink({
              link: `democracy.Detail`,
              payload: {
                procedureId: `${procedureId}`,
                from: "pushNotification"
              }
            });
          }
        },
        {
          text: "Ok",
          style: "cancel"
        }
      ]);
    };

    onNotificationReceivedBackground = notification => {
      console.log("Notification Received - Background", notification);
    };

    onNotificationOpened = ({ procedureId }) => {
      console.log("Notification opened by device user");
      const { navigator } = this.props;
      navigator.handleDeepLink({
        link: `democracy.Detail`,
        payload: {
          procedureId: `${procedureId}`,
          from: "pushNotification"
        }
      });
    };

    onPushRegistered = deviceToken => {
      // TODO: Send the token to my server so it could send back push notifications...
      console.log("Device Token Received", deviceToken);
    };

    onPushRegistrationFailed = error => {
      // For example:
      //
      // error={
      //   domain: 'NSCocoaErroDomain',
      //   code: 3010,
      //   localizedDescription: 'remote notifications are not supported in the simulator'
      // }
      console.error(error);
    };

    render() {
      console.log(
        "DeviceEventEmitter",
        DeviceEventEmitter.listeners("notificationReceivedForeground")
      );
      return <ComposedComponent {...this.props} />;
    }
  }

  WrappingComponent.propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired
  };

  return WrappingComponent;
};
