// import PushNotification from "react-native-push-notification";
// import {
//   PushNotificationIOS,
//   AsyncStorage,
//   Alert,
//   Platform
// } from "react-native";
// import Config from "react-native-config";
// import { Navigation, NativeEventsReceiver } from "react-native-navigation";

// import client from "../graphql/client";

// import ADD_TOKEN from "../graphql/mutations/addToken";

// let clientToken = false;

// const configure = async () => {
//   PushNotification.configure({
//     onRegister: async ({ token, os }) => {
//       clientToken = {
//         token,
//         os
//       };
//       if (!await AsyncStorage.getItem("push-token")) {
//         sendToken();
//       }
//     },

//     onNotification: async notification => {
//       // process the notification
//       let payloadData;
//       const { foreground } = notification;

//       if (Platform.OS === "android") {
//         payloadData = JSON.parse(notification.notification.payload);
//       } else {
//         payloadData = notification.data;
//       }

//       const { action, title, message, procedureId } = payloadData;

//       switch (action) {
//         case "procedureDetails":
//           if (foreground) {
//             Alert.alert(title, message, [
//               {
//                 text: "Anschauen",
//                 onPress: () => {
//                   Navigation.handleDeepLink({
//                     link: `democracy.Detail`,
//                     payload: {
//                       procedureId,
//                       from: "pushNotification"
//                     }
//                   });
//                 }
//               },
//               {
//                 text: "Ok",
//                 style: "cancel"
//               }
//             ]);
//           } else {
//             Navigation.handleDeepLink({
//               link: `democracy.Detail`,
//               payload: {
//                 procedureId,
//                 from: "pushNotification"
//               }
//             });
//           }
//           break;

//         default:
//           break;
//       }
//       // required on iOS only
//       notification.finish(PushNotificationIOS.FetchResult.NoData);
//     },

//     senderID: Config.NOTIFICATION_ANDROID_SENDER_ID,

//     permissions: {
//       alert: true,
//       badge: true,
//       sound: true
//     },

//     popInitialNotification: true,
//     requestPermissions: true
//   });
// };

// const sendToken = async () => {
//   if (clientToken) {
//     const { token, os } = clientToken;
//     // process token
//     const tokenSucceeded = await client.mutate({
//       mutation: ADD_TOKEN,
//       variables: {
//         token,
//         os
//       }
//     });
//     if (tokenSucceeded) {
//       await AsyncStorage.setItem("push-token", token);
//     }
//   }
// };

// export { configure, sendToken }; // eslint-disable-line
