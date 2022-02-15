import { by, device, expect, element } from 'detox';

describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id('title'))).toBeVisible();
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('MyUniqueId123')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });
});
