module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'plugin:jsx-a11y/strict',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jest/recommended',
    '@react-native-community',
  ],
  plugins: ['react-hooks', 'better-styled-components', 'detox'],
  rules: {
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
    'react/jsx-fragments': [1, 'syntax'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // My Config changes
    // TODO check to enable it again
    'jsx-a11y/accessible-emoji': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/camelcase': 0,
    'react-native/no-raw-text': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/no-explicit-any': 0,
    'jsx-a11y/no-autofocus': 0,
    'react-native/no-inline-styles': 0,
    'react-native/no-color-literals': 0,
  },
  env: {
    jest: true,
    'detox/detox': true,
    'react-native/react-native': true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
