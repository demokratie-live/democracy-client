import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navigator, Navigation } from "react-native-navigation";
import { Platform, AsyncStorage } from "react-native";
import NotificationsIOS, {
  NotificationsAndroid,
  PendingNotifications
} from "react-native-notifications";
import DeviceInfo from "react-native-device-info";

import client from "../graphql/client";
import ViewedProcedures from "../services/ViewedProcedures";

import ADD_TOKEN from "../graphql/mutations/addToken";
import F_PROCEDURE_VIEWED from "../graphql/fragments/ProcedureViewed";

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
          if (!DeviceInfo.isEmulator()) {
            NotificationsIOS.requestPermissions();
          }

          NotificationsIOS.addEventListener(
            "notificationReceivedForeground",
            notification => {
              this.onNotificationReceivedForeground(notification.getData());
            }
          );
          NotificationsIOS.addEventListener(
            "notificationReceivedBackground",
            notification => {
              this.onNotificationReceivedBackground(notification.getData());
            }
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
                console.log(
                  "PUSHLOG: setRegistrationTokenUpdateListener",
                  deviceToken
                );
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
            NotificationsAndroid.refreshToken();

            // On Android, we allow for only one (global) listener per each event type.
            NotificationsAndroid.setNotificationReceivedListener(
              notification => {
                console.log(
                  "PUSHLOG: setNotificationReceivedListener",
                  notification
                );
                const notificationData = JSON.parse(
                  notification.getData().payload
                );

                this.onNotificationReceivedForeground(notificationData);
              }
            );
            NotificationsAndroid.setNotificationOpenedListener(notification => {
              console.log(
                "PUSHLOG: setNotificationOpenedListener",
                notification
              );
              const notificationData = JSON.parse(
                notification.getData().payload
              );
              this.onNotificationOpened(notificationData);
            });

            PendingNotifications.getInitialNotification()
              .then((notification, ...rest) => {
                console.log(
                  "PUSHLOG: getInitialNotification",
                  notification,
                  rest
                );
                if (notification) {
                  const notificationData = JSON.parse(
                    notification.getData().payload
                  );
                  this.onNotificationOpened(notificationData);
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
          console.log("PUSHLOG: NotificationsIOS.consumeBackgroundQueue();");
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

    onNotificationReceivedForeground = async notification => {
      console.log("PUSHLOG: onNotificationReceivedForeground", notification);
      const { navigator } = this.props;
      const { title, message, procedureId, type } = notification;
      await this.handlePushData(notification);

      if (type === "procedure") {
        Navigation.showInAppNotification({
          screen: "democracy.Notifications.InApp", // unique ID registered with Navigation.registerScreen
          passProps: {
            title,
            description: message,
            onClick: () => {
              navigator.handleDeepLink({
                link: `democracy.Detail`,
                payload: {
                  procedureId: `${procedureId}`,
                  from: "pushNotification"
                }
              });
            }
          }, // simple serializable object that will pass as props to the in-app notification (optional)
          autoDismissTimerSec: 3 // auto dismiss notification in seconds
        });
      } else if (type === "procedureBulk") {
        Navigation.showInAppNotification({
          screen: "democracy.Notifications.InApp", // unique ID registered with Navigation.registerScreen
          passProps: {
            title,
            description: message
          }, // simple serializable object that will pass as props to the in-app notification (optional)
          autoDismissTimerSec: 3 // auto dismiss notification in seconds
        });
      }
    };

    onNotificationReceivedBackground = notification => {
      console.log("PUSHLOG: onNotificationReceivedBackground", notification);
      this.handlePushData(notification);
    };

    onNotificationOpened = notification => {
      console.log("PUSHLOG: onNotificationOpened", notification);
      this.handlePushData(notification);
    };

    onPushRegistered = async deviceToken => {
      console.log("PUSHLOG: onPushRegistered", deviceToken);
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
      console.log("PUSHLOG: onPushRegistrationFailed", error);
      console.error(error);
    };

    handlePushData = async notification => {
      console.log("PUSHLOG: handlePushData", notification, notification.type);
      const { procedureId, procedureIds, type } = notification;
      if (type === "procedure") {
        await ViewedProcedures.setViewedProcedure({
          procedureId,
          status: "PUSH"
        });

        // write graphQL cache
        const aiFragment = client.readFragment({
          id: procedureId,
          fragment: F_PROCEDURE_VIEWED
        });
        aiFragment.viewedStatus = "PUSH";
        client.writeFragment({
          id: procedureId,
          fragment: F_PROCEDURE_VIEWED,
          data: aiFragment
        });
      } else if (type === "procedureBulk") {
        await ViewedProcedures.setViewedProcedures({
          procedureIds,
          status: "PUSH"
        });

        procedureIds.forEach(id => {
          // write graphQL cache
          const aiFragment = client.readFragment({
            id,
            fragment: F_PROCEDURE_VIEWED
          });
          if (aiFragment) {
            aiFragment.viewedStatus = "PUSH";
            client.writeFragment({
              id,
              fragment: F_PROCEDURE_VIEWED,
              data: aiFragment
            });
          }
        });
      }
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
