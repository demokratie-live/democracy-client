/* eslint-disable jest/no-jasmine-globals */
import { cleanup, init, device } from 'detox';
import adapter from 'detox/runners/jest/adapter';
import specReporter from 'detox/runners/jest/specReporter';
import assignReporter from 'detox/runners/jest/assignReporter';

const config = require('../package.json').detox;

// Set the default timeout
jest.setTimeout(1000000);
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

jasmine.getEnv().addReporter(assignReporter);

beforeAll(async () => {
  await init(config, { launchApp: true, initGlobals: false });
  await device.launchApp({
    newInstance: true,
    launchArgs: { detoxPrintBusyIdleResources: 'YES' },
  });
});

beforeEach(async () => {
  await adapter.beforeEach();
});

afterAll(async () => {
  await adapter.afterAll();
  await cleanup();
});
