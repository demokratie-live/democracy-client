/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

import './src/api/hooks/useNotifee';

AppRegistry.registerComponent(appName, () => App);
