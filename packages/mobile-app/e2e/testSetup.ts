/* eslint-disable jest/no-jasmine-globals */
import { cleanup, init } from 'detox';
import adapter from 'detox/runners/jest/adapter';
import specReporter from 'detox/runners/jest/specReporter';
import assignReporter from 'detox/runners/jest/assignReporter';

const config = require('../package.json').detox;

// Set the default timeout
jest.setTimeout(600000);
// @ts-ignore
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
// @ts-ignore
jasmine.getEnv().addReporter(specReporter);

// @ts-ignore
jasmine.getEnv().addReporter(assignReporter);

beforeAll(async () => {
  await init(config, { initGlobals: false });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
