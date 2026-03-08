/** @type {import('jest').Config} */
module.exports = {
  // Use babel-jest directly with the expo babel config — avoids React Native
  // setup files that fail in a Node environment (pure TypeScript tests only).
  transform: {
    "\\.[jt]sx?$": [
      "babel-jest",
      {
        caller: { name: "metro", bundler: "metro", platform: "ios" },
        configFile: "./babel.config.js",
      },
    ],
  },
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};
