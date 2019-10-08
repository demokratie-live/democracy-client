/**
 * @format
 */

import 'react-native-gesture-handler'; // TODO remove workaround https://github.com/kmagiera/react-native-gesture-handler/issues/320#issuecomment-538190653
import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
