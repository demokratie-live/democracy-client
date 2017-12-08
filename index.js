import { Navigation } from 'react-native-navigation';

import registerScreens from './src/screens';

registerScreens();

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'BTag',
      screen: 'democracy.BundestagTabScreen',
      title: 'Bundestag',
    },
  ],
});
