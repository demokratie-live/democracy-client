import { AppRegistry } from "react-native";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

AppRegistry.registerComponent("MyApp", () => App);
AppRegistry.runApplication("MyApp", {
  rootTag: document.getElementById("root")
});
registerServiceWorker();
