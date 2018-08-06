import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener
} from "react-native-navigation";
import { NetInfo } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import Reactotron from "reactotron-react-native";

// Migrations
import Migrations from "./src/migrations";

import client, { persistor } from "./src/graphql/client";
import registerScreens from "./src/screens";

import IS_INSTRUCTIONS_SHOWN from "./src/graphql/queries/local/isInstructionShown";
import setCurrentScreen from "./src/graphql/mutations/setCurrentScreen";
import UPDATE_NETWORK_STATUS from "./src/graphql/mutations/updateNetworkStatus";

import topTabs from "./src/screens/VoteList/topTabs";

import "./src/services/browserLinks";

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

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

    // const listener = new RNNScreenVisibilityListener({
    //   didAppear: args => {
    //     let { screen } = args;

    //     if (screen === "democracy.VoteList.List") {
    //       screen = "democracy.VoteList";
    //     }

    //     client.mutate({
    //       mutation: setCurrentScreen,
    //       variables: {
    //         screen
    //       }
    //     });
    //   }
    // });
    // listener.register();

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

  startApp = async ({ isInstructionsShown = false } = {}) => {
    // Decide Startscreen

    const menuIcon = await Ionicons.getImageSource("ios-menu", 24, "#FFFFFF");

    Navigation.events().registerAppLaunchedListener(() => {
      Navigation.setDefaultOptions({
        topBar: {
          title: {
            color: "#fff"
          },
          background: {
            color: "#4494d3"
          },
          noBorder: true,
          leftButtons: {
            id: "buttonOne",
            icon: menuIcon,
            color: "#fff"
          }
        }
      });
      Navigation.setRoot({
        root: {
          sideMenu: {
            left: {
              component: {
                id: "leftSideComponentId",
                name: "democracy.SideMenu"
              },
              visible: true,
              enabled: true
            },
            center: {
              stack: {
                id: "mainView",
                children: [
                  {
                    component: {
                      name: "democracy.VoteList"
                    }
                  }
                ],
                options: {
                  topBar: {
                    title: {
                      text: "Bundestag".toUpperCase()
                    },
                    backButton: {
                      showTitle: false
                    }
                  }
                }
              }
            }
          }
        }
      });
      Navigation.events().registerNavigationButtonPressedListener(event => {
        console.log("DDBUG 6", event);
        Navigation.mergeOptions(event.componentId, {
          sideMenu: {
            left: {
              visible: true
            }
          }
        });
      });
    });

    //   if (isInstructionsShown) {
    //     Navigation.startSingleScreenApp({
    //       screen: {
    //         screen: "democracy.VoteList",
    //         title: "Bundestag".toUpperCase(),
    //         navigatorStyle: {},
    //         topTabs
    //       },
    //       drawer: {
    //         left: {
    //           screen: "democracy.SideMenu",
    //           disableOpenGesture: true
    //         },
    //         style: {
    //           // ( iOS only )
    //           leftDrawerWidth: 85 // optional, add this if you want a define left drawer width (50=percent)
    //         },
    //         disableOpenGesture: true
    //       },
    //       appStyle: {
    //         navBarNoBorder: true,
    //         navBarButtonColor: "#FFFFFF",
    //         navBarBackgroundColor: "#4494d3",
    //         navBarTextColor: "#FFFFFF",
    //         navBarTextFontSize: 17,
    //         selectedTopTabTextColor: "#ffffff",
    //         selectedTopTabIndicatorColor: "#ffffff",
    //         selectedTopTabIndicatorHeight: 5
    //       },
    //       animationType: "fade"
    //     });
    //   } else {
    //     Navigation.startSingleScreenApp({
    //       screen: {
    //         screen: "democracy.Instructions",
    //         title: "Instructions",
    //         navigatorStyle: {
    //           navBarHidden: true
    //         }
    //       },
    //       animationType: "fade",
    //       appStyle: {
    //         orientation: "portrait"
    //       }
    //     });
    //   }
  };
}

(async () => {
  await persistor.restore();

  console.log("migrations start");
  const migrations = await Migrations();
  if (migrations.some(v => v)) {
    await persistor.purge();
  }
  console.log("migrations finish");

  const app = new App(); // eslint-disable-line
})();
