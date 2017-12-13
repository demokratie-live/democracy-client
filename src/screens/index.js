import { Navigation } from 'react-native-navigation';

import BundestagTabScreen from './List';
import BundestagDetailsTabScreen from './ListDetails';

// register all screens of the app (including internal ones)
export default function registerScreens() {
  Navigation.registerComponent('democracy.BundestagTabScreen', () => BundestagTabScreen);
  Navigation.registerComponent(
    'democracy.BundestagDetailsTabScreen',
    () => BundestagDetailsTabScreen,
  );
}
