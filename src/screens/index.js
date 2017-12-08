import { Navigation } from 'react-native-navigation';

import BundestagTabScreen from './List';

// register all screens of the app (including internal ones)
export default function registerScreens() {
  Navigation.registerComponent('democracy.BundestagTabScreen', () => BundestagTabScreen);
}
