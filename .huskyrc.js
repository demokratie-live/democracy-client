module.exports = {
  hooks: {
    "pre-commit":
      // todo add yarn audit first with good level
      // yarn workspace app e2e:ios-debug on travicCi
      "lint-staged"
  }
};
