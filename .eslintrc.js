module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  parser: "babel-eslint",
  plugins: ["react", "react-native", "flowtype", "prettier", "standard"],
  extends: ["airbnb",
  "eslint:recommended",
  "plugin:react/recommended", "prettier", "prettier/flowtype", "prettier/react"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ios.js", ".android.js"]
      }
    },
    "react": {
      "pragma": "React",  // Pragma to use, default to "React"
      "version": "16.6", // React version, default to the latest React stable release
      "flowVersion": "0.78" // Flow version
    },
  },
  rules: {
    "prettier/prettier": ["error"],
    "react/jsx-filename-extension": ["error", { extensions: [".js", ".jsx"] }],
    "no-use-before-define": 0,
    "global-require": 0,
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "no-console": ["warn"]
  }
};
