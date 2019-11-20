module.exports = {
  hooks: {
    "pre-push":
      // todo add yarn audit first with good level
      "yarn workspace app lint:ts && yarn workspace app e2e:ios-debug && lint-staged"
  }
};
