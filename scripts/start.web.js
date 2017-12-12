process.env.NODE_ENV = 'production';
const path = require('path');

const webpackConfigProd = require('react-scripts/config/webpack.config.dev');

webpackConfigProd.module.rules.push({
  test: /\.ttf$/,
  loader: 'url-loader', // or directly file-loader
  include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
});

webpackConfigProd.resolve.alias['react-native-vector-icons/Ionicons'] =
  'react-native-vector-icons/dist/Ionicons';
webpackConfigProd.resolve.alias['react-native-vector-icons/MaterialIcons'] =
  'react-native-vector-icons/dist/MaterialIcons';

require('react-scripts/scripts/start');
