import { by, device, expect, element, init } from 'detox';
const config = require('../../package.json').detox;

describe('Example', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    // await device.reloadReactNative();
    await device.launchApp({ newInstance: true });
  });

  it('should have introduction screen', async () => {
    await expect(element(by.id('Introduction'))).toBeVisible();
  });

  it('should have introduction nex button', async () => {
    await expect(element(by.id('PagerNextButton'))).toBeVisible();
  });

  it('click throw all screens', async () => {
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await expect(element(by.id('PagerNextButton'))).toBeNotVisible();
  });
});
