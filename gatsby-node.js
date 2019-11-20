exports.onCreateWebpackConfig = function(args) {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-native-linear-gradient": "react-native-web-linear-gradient",
        "react-native-svg": "react-native-svg-web"
      }
    }
  });
};
