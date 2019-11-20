module.exports = {
  hooks: {
    "pre-push":
      // todo add yarn audit first with good level
      "yarn workspace app lint && yarn workspace app @democracy-deutschland/mobile-ui lint && yarn workspace app e2e:ios-debug && lint-staged"
  }
};
