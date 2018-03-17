// @flow
import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener
} from "react-native-navigation";
import Reactotron from "reactotron-react-native";

import client, { persistor } from "./src/graphql/client";
import registerScreens from "./src/screens";

import IS_INSTRUCTIONS_SHOWN from "./src/graphql/queries/isInstructionShown";
import setCurrentScreen from "./src/graphql/mutations/setCurrentScreen";

import topTabs from "./src/screens/VoteList/topTabs";

Reactotron.configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!

registerScreens();

class App {
  constructor() {
    const observableQuery = client.watchQuery({ query: IS_INSTRUCTIONS_SHOWN });
    observableQuery.subscribe({
      next: ({ data }) => this.startApp(data)
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
  }

  startApp = ({ isInstructionsShown }) => {
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

persistor.restore().then(() => {
  const app = new App(); // eslint-disable-line
});
