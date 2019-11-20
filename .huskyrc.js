module.exports = {
  hooks: {
    "pre-push":
      // todo add yarn audit first with good level
      "yarn lint && yarn workspace app e2e:ios-debug && lint-staged"
  }
};
