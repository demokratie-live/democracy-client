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
          screen: "example.FirstTabScreen", // unique ID registered with Navigation.registerScreen
          title: "App" // title of the screen as appears in the nav bar (optional)
        },
        animationType: "fade"
      });
    } else {
      Navigation.startSingleScreenApp({
        screen: {
          screen: "democracy.Instructions", // unique ID registered with Navigation.registerScreen
          title: "Instructions", // title of the screen as appears in the nav bar (optional)
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
