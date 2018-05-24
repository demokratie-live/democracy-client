import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener
} from "react-native-navigation";
import { AsyncStorage, NetInfo, Platform } from "react-native";
import RSAKey from "react-native-rsa";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import Config from "react-native-config";
// import NotificationsIOS, {
//   NotificationsAndroid,
//   PendingNotifications
// } from "react-native-notifications";

// import Reactotron from "reactotron-react-native";

import client, { persistor } from "./src/graphql/client";
import registerScreens from "./src/screens";
// import { pushNotifications } from "./src/services";

import IS_INSTRUCTIONS_SHOWN from "./src/graphql/queries/isInstructionShown";
import setCurrentScreen from "./src/graphql/mutations/setCurrentScreen";
import SIGN_UP from "./src/graphql/mutations/signUp";
import UPDATE_NETWORK_STATUS from "./src/graphql/mutations/updateNetworkStatus";
import ME from "./src/graphql/queries/me";
// import ADD_TOKEN from "./src/graphql/mutations/addToken";

import topTabs from "./src/screens/VoteList/topTabs";

import "./src/services/browserLinks";

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

// pushNotifications.configure();

// console.log("Push notifications refresh Token!");
// NotificationsAndroid.refreshToken();
// console.log("Push notifications refreshed Token!");

if (Platform.OS === "android") {
  // NotificationsAndroid.setRegistrationTokenUpdateListener(async deviceToken => {
  //   // TODO: Send the token to my server so it could send back push notifications...
  //   console.log("Push notifications registered!", deviceToken);
  //   const tokenSucceeded = await client.mutate({
  //     mutation: ADD_TOKEN,
  //     variables: {
  //       token: deviceToken,
  //       os: "android"
  //     }
  //   });
  //   if (tokenSucceeded) {
  //     await AsyncStorage.setItem("push-token", deviceToken);
  //   }
  // });
  // // On Android, we allow for only one (global) listener per each event type.
  // NotificationsAndroid.setNotificationReceivedListener(notification => {
  //   console.log("Notification received on device", notification.getData());
  // });
  // NotificationsAndroid.setNotificationOpenedListener(notification => {
  //   console.log("Notification opened by device user", notification.getData());
  // });
  // PendingNotifications.getInitialNotification()
  //   .then(notification => {
  //     console.log(
  //       "Initial notification was:",
  //       notification ? notification.getData() : "N/A"
  //     );
  //   })
  //   .catch(err => console.error("getInitialNotifiation() failed", err));
} else {
  // NotificationsIOS.addEventListener(
  //   "remoteNotificationsRegistered",
  //   async deviceToken => {
  //     // TODO: Send the token to my server so it could send back push notifications...
  //     console.log("Device Token Received", deviceToken);
  //     const tokenSucceeded = await client.mutate({
  //       mutation: ADD_TOKEN,
  //       variables: {
  //         token: deviceToken,
  //         os: "ios"
  //       }
  //     });
  //     console.log("device token mutation", tokenSucceeded);
  //     if (tokenSucceeded) {
  //       await AsyncStorage.setItem("push-token", deviceToken);
  //     }
  //   }
  // );
  // NotificationsIOS.addEventListener(
  //   "remoteNotificationsRegistrationFailed",
  //   error => {
  //     // For example:
  //     //
  //     // error={
  //     //   domain: 'NSCocoaErroDomain',
  //     //   code: 3010,
  //     //   localizedDescription: 'remote notifications are not supported in the simulator'
  //     // }
  //     console.warn(error);
  //   }
  // );
  // NotificationsIOS.requestPermissions();
  //   componentWillUnmount() {
  //     // prevent memory leaks!
  //     NotificationsIOS.removeEventListener('remoteNotificationsRegistered', this.onPushRegistered.bind(this));
  //   NotificationsIOS.removeEventListener('remoteNotificationsRegistrationFailed', this.onPushRegistrationFailed.bind(this));
  // }
  // receive Notifications
  // NotificationsIOS.addEventListener(
  //   "notificationReceivedForeground",
  //   notification => {
  //     console.log("Notification Received - Foreground", notification);
  //   }
  // );
  // NotificationsIOS.addEventListener(
  //   "notificationReceivedBackground",
  //   notification => {
  //     console.log("Notification Received - Background", notification);
  //   }
  // );
  // NotificationsIOS.addEventListener("notificationOpened", notification => {
  //   console.log("Notification opened by device user", notification);
  // });
}

registerScreens();

class App {
  constructor() {
    const observableQuery = client.watchQuery({
      query: IS_INSTRUCTIONS_SHOWN
    });
    observableQuery.subscribe({
      next: ({ data }) => {
        if (this.isInstructionsShown !== data.isInstructionsShown) {
          this.startApp(data);
        }
        this.isInstructionsShown = data.isInstructionsShown;
      }
    });

    const listener = new RNNScreenVisibilityListener({
      didAppear: args => {
        let { screen } = args;

        if (screen === "democracy.VoteList.List") {
          screen = "democracy.VoteList";
        }

        client.mutate({
          mutation: setCurrentScreen,
          variables: {
            screen
          }
        });
      }
    });
    listener.register();

    NetInfo.isConnected.addEventListener("connectionChange", isConnected => {
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          isConnected
        }
      });
    });
  }

  checkToShowInstructions = async () => {
    const { data: { isInstructionsShown } } = await client.query({
      query: IS_INSTRUCTIONS_SHOWN,
      options: {
        fetchPolicy: "cache-first"
      }
    });
    return isInstructionsShown;
  };

  getNewToken = async () => {
    const rsa = new RSAKey();
    rsa.setPublicString(Config.PUBLIC_KEY); // return json encoded string
    const uniqueID = await sha256(DeviceInfo.getUniqueID());
    const deviceHashEncrypted = rsa.encrypt(uniqueID);

    try {
      const { data } = await client.mutate({
        mutation: SIGN_UP,
        variables: {
          deviceHashEncrypted
        }
      });

      await AsyncStorage.setItem("authorization", data.signUp.token);
    } catch (error) {
      // TODO: Show later a message that user is not registered
    }
  };

  startApp = async ({ isInstructionsShown = false } = {}) => {
    // await AsyncStorage.removeItem("authorization");
    const token = await AsyncStorage.getItem("authorization");
    if (!token) {
      await this.getNewToken();
    } else {
      try {
        const me = await client
          .query({
            query: ME,
            fetchPolicy: "network-only"
          })
          .then(({ data }) => data.me);
        if (!me) {
          await this.getNewToken();
        }
      } catch (error) {
        // TODO: handle this
      }
    }
    // pushNotifications.sendToken();

    // Decide Startscreen
    if (isInstructionsShown) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: "democracy.VoteList",
          title: "Bundestag".toUpperCase(),
          navigatorStyle: {},
          topTabs
        },
        drawer: {
          left: {
            screen: "democracy.SideMenu"
          },
          style: {
            // ( iOS only )
            leftDrawerWidth: 85 // optional, add this if you want a define left drawer width (50=percent)
          }
        },
        appStyle: {
          navBarNoBorder: true,
          navBarButtonColor: "#FFFFFF",
          navBarBackgroundColor: "#4494d3",
          navBarTextColor: "#FFFFFF",
          navBarTextFontSize: 17,
          selectedTopTabTextColor: "#ffffff",
          selectedTopTabIndicatorColor: "#ffffff",
          selectedTopTabIndicatorHeight: 5
        },
        animationType: "fade"
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: "democracy.Instructions",
          title: "Instructions",
          navigatorStyle: {
            navBarHidden: true
          }
        },
        animationType: "fade",
        appStyle: {
          orientation: "portrait"
        }
      });
    }
  };
}

(async () => {
  await persistor.restore();

  const app = new App(); // eslint-disable-line
})();
