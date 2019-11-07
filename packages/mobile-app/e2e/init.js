const detox = require('detox');
const config = require('../package.json').detox;
const adapter = require('detox/runners/jest/adapter');
const specReporter = require('detox/runners/jest/specReporter');
const assignReporter = require('detox/runners/jest/assignReporter');

/* global jest, jasmine, beforeAll, beforeEach, afterAll, device */

// Set the default timeout
jest.setTimeout(60000);
jasmine.getEnv().addReporter(adapter);

// This takes care of generating status logs on a per-spec basis. By default, jest only reports at file-level.
// This is strictly optional.
jasmine.getEnv().addReporter(specReporter);

jasmine.getEnv().addReporter(assignReporter);

beforeAll(async () => {
  await detox.init(config, { launchApp: false });
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
  await detox.cleanup();
});
