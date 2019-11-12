module.exports = {
  displayName: 'mobile-app',
  preset: 'react-native',
  transform: {
    '\\.js$': '<rootDir>/../../node_modules/react-native/jest/preprocessor.js',
  },
  cacheDirectory: '.jest/cache',
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/node_modules/'],
  // The root of your source code, typically /src
  // `<rootDir>` is a token Jest substitutes
  roots: ['<rootDir>/src'],

  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/assetsTransformer.js',
  },

  // Test spec file resolution pattern
  // Matches parent folder `__tests__` and filename
  // should contain `test` or `spec`.
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  setupFiles: [
    '../../node_modules/react-native-gesture-handler/jestSetup.js',
    '<rootDir>/test/jestSetup.js',
  ],
};
