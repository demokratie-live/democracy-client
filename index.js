import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener
} from "react-native-navigation";
import { AsyncStorage, NetInfo } from "react-native";
import RSAKey from "react-native-rsa";
import DeviceInfo from "react-native-device-info";
import { sha256 } from "react-native-sha256";
import Config from "react-native-config";
// import Reactotron from "reactotron-react-native";

import client, { persistor } from "./src/graphql/client";
import registerScreens from "./src/screens";
import { pushNotifications } from "./src/services";

import IS_INSTRUCTIONS_SHOWN from "./src/graphql/queries/isInstructionShown";
import setCurrentScreen from "./src/graphql/mutations/setCurrentScreen";
import SIGN_UP from "./src/graphql/mutations/signUp";
import UPDATE_NETWORK_STATUS from "./src/graphql/mutations/updateNetworkStatus";
import ME from "./src/graphql/queries/me";

import topTabs from "./src/screens/VoteList/topTabs";

import "./src/services/browserLinks";

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

pushNotifications.configure();

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
    pushNotifications.sendToken();

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
