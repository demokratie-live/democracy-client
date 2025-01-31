module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "@welldone-software/why-did-you-render",
        },
      ],
    ],
    plugins: [
      // ["babel-plugin-react-docgen-typescript", { exclude: "node_modules" }],
      "react-native-reanimated/plugin",
    ],
  };
};
