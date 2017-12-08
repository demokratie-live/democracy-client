import { Navigation } from 'react-native-navigation';

import registerScreens from './screens';

registerScreens();

// start the app
Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'BTag',
      screen: 'democracy.BundestagTabScreen',
      title: 'Bundestag',
      icon: require('./assets/icons/list.png'),
    },
  ],
});
