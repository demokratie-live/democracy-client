// @flow
import { Navigation } from "react-native-navigation";
// import Reactotron from "reactotron-react-native";

import client, { persistor } from "./src/graphql/client";
import registerScreens from "./src/screens";

import IS_INSTRUCTIONS_SHOWN from "./src/graphql/queries/isInstructionShown";

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

registerScreens();

class App {
  constructor() {
    const observableQuery = client.watchQuery({ query: IS_INSTRUCTIONS_SHOWN });
    observableQuery.subscribe({
      next: ({ data }) => this.startApp(data)
    });
  }

  startApp = ({ isInstructionsShown }) => {
    // Decide Startscreen
    if (isInstructionsShown) {
      Navigation.startSingleScreenApp({
        screen: {
          screen: "democracy.VoteList",
          title: "Bundestag",
          navigatorStyle: {},
          topTabs: [
            {
              screenId: "democracy.VoteList.List",
              title: "Abstimmung",
              passProps: {
                listType: "POLLS"
              }
            },
            {
              screenId: "democracy.VoteList.List",
              title: "Vorbereitung",
              passProps: {
                listType: "PREPARATION"
              }
            },
            {
              screenId: "democracy.VoteList.List",
              title: "What's Hot",
              passProps: {
                listType: "HOT"
              }
            }
          ]
        },
        drawer: {
          left: {
            screen: "democracy.SideMenu"
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
        animationType: "fade"
      });
    }
  };
}

persistor.restore().then(() => {
  const app = new App(); // eslint-disable-line
});
