import { Navigation } from "react-native-navigation";

import App from "./App";

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent("example.FirstTabScreen", () => App);
}
