/* global element, by, expect, detox, config, device */

describe('Example', () => {
  beforeEach(async () => {
    console.log('HA 1');
    console.log('HA 1.1', device, config);
    if (typeof device === 'undefined') {
      await detox.init(config);
    }
    await device.reloadReactNative();
    console.log('HA 2');
  });

  it('should have welcome screen', async () => {
    console.log('HA 3');
    await expect(element(by.id('welcome'))).toBeVisible();
    console.log('HA 4');
  });

  it('should show hello screen after tap', async () => {
    await element(by.id('hello_button')).tap();
    await expect(element(by.text('Hello!!!'))).toBeVisible();
  });

  it('should show world screen after tap', async () => {
    await element(by.id('world_button')).tap();
    await expect(element(by.text('World!!!'))).toBeVisible();
  });
});
