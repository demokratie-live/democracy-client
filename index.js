import React from 'react';
import {
  Navigation,
  ScreenVisibilityListener as RNNScreenVisibilityListener,
} from 'react-native-navigation';
import { NetInfo, YellowBox } from 'react-native';
// import Reactotron from 'reactotron-react-native';

import Config from './src/config';

import client, { persistor } from './src/graphql/client';
import registerScreens from './src/screens';

import IS_INSTRUCTIONS_SHOWN from './src/graphql/queries/local/isInstructionShown';
import setCurrentScreen from './src/graphql/mutations/setCurrentScreen';
import UPDATE_NETWORK_STATUS from './src/graphql/mutations/updateNetworkStatus';

import topTabs from './src/screens/VoteList/topTabs';

import './src/services/browserLinks';

YellowBox.ignoreWarnings(['Require cycle:', 'Attempted to invoke']);

if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React, {
    exclude: [
      '_class',
      /^Touchable/,
      /^Yellow/,
      /^Safe/,
      'CellRenderer',
      'StyledNativeComponent',
      'Query',
      'ItemWithSeparator',
      'AnimatedComponent',
      'FlatList',
      /^Virtualized/,
      'RefreshControl',
      'Mutation',
      /^Apollo/,
      'ListFooterComponent',
      'StatusBar',
      'SectionList',
      'ScrollView',
      'LinearGradient',

      // SVG
      // 'Path',
      // 'Text',
      // 'G',
      // 'TSpan',
      // 'Rect',
      // 'Svg',
      // 'Circle',

      // Recheck
      // 'Segment',
      // 'Icon',
      // 'IntroButton',
      // 'Row',
      // 'BalloutBox',
      // 'ListLoading',
      // 'VotedProceduresWrapper',
      // /^Svg/,
    ],
  });
}

// Reactotron.configure() // controls connection & communication settings
//   .useReactNative() // add all built-in react native plugins
//   .connect(); // let's connect!

registerScreens();

class App {
  constructor() {
    const observableQuery = client.watchQuery({
      query: IS_INSTRUCTIONS_SHOWN,
    });
    observableQuery.subscribe({
      next: ({ data }) => {
        if (this.isInstructionsShown !== data.isInstructionsShown) {
          this.startApp(data);
        }
        this.isInstructionsShown = data.isInstructionsShown;
      },
    });

    const listener = new RNNScreenVisibilityListener({
      didAppear: args => {
        let { screen } = args;

        if (screen === 'democracy.VoteList.List') {
          screen = 'democracy.VoteList';
        }

        client.mutate({
          mutation: setCurrentScreen,
          variables: {
            screen,
          },
        });
      },
    });
    listener.register();

    NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
      client.mutate({
        mutation: UPDATE_NETWORK_STATUS,
        variables: {
          isConnected,
        },
      });
    });
  }

  checkToShowInstructions = async () => {
    const {
      data: { isInstructionsShown },
    } = await client.query({
      query: IS_INSTRUCTIONS_SHOWN,
      options: {
        fetchPolicy: 'cache-first',
      },
    });
    return isInstructionsShown;
  };

  startTutorial = () => {
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'democracy.Instructions',
        title: 'Instructions',
        navigatorStyle: {
          navBarHidden: true,
        },
      },
      animationType: 'fade',
      appStyle: {
        orientation: 'portrait',
      },
    });
  };

  startBetaEnd = () => {
    Navigation.showModal({
      screen: 'democracy.BetaEnd',
      navigatorStyle: {
        navBarHidden: true,
      },
      animationType: 'fade',
      appStyle: {
        orientation: 'portrait',
      },
    });
  };

  startList = async () =>
    Navigation.startSingleScreenApp({
      screen: {
        screen: 'democracy.VoteList',
        title: 'Bundestag'.toUpperCase(),
        navigatorStyle: {}, //
        topTabs,
      },
      drawer: {
        left: {
          screen: 'democracy.SideMenu',
          disableOpenGesture: true,
        },
        style: {
          // ( iOS only )
          leftDrawerWidth: 85, // optional, add this if you want a define left drawer width (50=percent)
        },
        disableOpenGesture: true,
      },
      appStyle: {
        navBarNoBorder: true,
        navBarButtonColor: '#FFFFFF',
        navBarBackgroundColor: '#4494d3',
        navBarTextColor: '#FFFFFF',
        navBarTextFontSize: 17,
        selectedTopTabTextColor: '#ffffff',
        selectedTopTabIndicatorColor: '#ffffff',
        selectedTopTabIndicatorHeight: 5,
        topTabsScrollable: true,
      },
      animationType: 'fade',
    });

  startApp = async ({ isInstructionsShown = false } = {}) => {
    // Show Tutorial?
    if (!isInstructionsShown) {
      this.startTutorial();
      return;
    }

    // Show List
    await this.startList();

    // Show Beta End Modal?
    if (Config.BETA_END) {
      this.startBetaEnd();
    }
  };
}

(async () => {
  await persistor.restore();
  const app = new App(); // eslint-disable-line
})();
