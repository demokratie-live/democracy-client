import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigator } from "react-native-navigation";
import { Platform, AsyncStorage, Alert } from "react-native";
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
              const { title, message, procedureId } = JSON.parse(
                notification.getData().payload
              );
              this.onNotificationOpened({ title, message, procedureId });
            });

            PendingNotifications.getInitialNotification()
              .then(notification => {
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
      const { navigator } = this.props;
      navigator.handleDeepLink({
        link: `democracy.Detail`,
        payload: {
          procedureId: `${procedureId}`,
          from: "pushNotification"
        }
      });
    };

    onPushRegistered = async deviceToken => {
      // TODO: Send the token to my server so it could send back push notifications...
      const tokenSucceeded = await client.mutate({
        mutation: ADD_TOKEN,
        variables: {
          token: deviceToken,
          os: "ios"
        }
      });
      if (tokenSucceeded) {
        await AsyncStorage.setItem("push-token", deviceToken);
      }
    };

    onPushRegistrationFailed = error => {
      console.error(error);
    };

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  WrappingComponent.propTypes = {
    navigator: PropTypes.instanceOf(Navigator).isRequired
  };

  return WrappingComponent;
};
