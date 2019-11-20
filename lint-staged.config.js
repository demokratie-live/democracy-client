module.exports = {
  "*.{js,jsx,ts,tsx}": [
    // go to ui
    "cd packages/mobile-ui",
    // do some tests
    "cd ../..",

    // go to app
    "cd packages/mobile-app",
    "yarn workspace app format",
    "eslint --fix",
    "cross-env NODE_ENV=test jest --bail --findRelatedTests",
    "cd ../..",

    // do complete
    "git add"
  ]
};
