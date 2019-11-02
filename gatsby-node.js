exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      alias: {
        "react-native": "react-native-web",
        "react-native-linear-gradient": "react-native-web-linear-gradient"
      }
    }
  });
};
