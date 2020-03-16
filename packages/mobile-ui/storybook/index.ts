import { AppRegistry } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';
import { loadStories } from './storyLoader';

import './rn-addons';

// import stories
configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage: require('@react-native-community/async-storage').default,
});

AppRegistry.registerComponent('democracyUI', () => StorybookUIRoot);

export default StorybookUIRoot;
