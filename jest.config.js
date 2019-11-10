module.exports = {
  projects: [
    "<rootDir>/packages/mobile-app/jest.config.js",
    "<rootDir>/packages/mobile-ui/jest.config.js"
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["js", "ts", "tsx"]
};
