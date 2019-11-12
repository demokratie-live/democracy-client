module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./testSetup.ts'],
  reporters: ['detox/runners/jest/streamlineReporter'],
  verbose: true,
};
