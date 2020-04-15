import { by, device, expect, element, init, waitFor } from 'detox';
const config = require('../../package.json').detox;

describe('Example', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    // await device.reloadReactNative();
  });

  it('should have introduction screen', async () => {
    await expect(element(by.id('Introduction'))).toBeVisible();
  });

  it('should have introduction nex button', async () => {
    await expect(element(by.id('PagerNextButton'))).toBeVisible();
  });

  // it('should have welcome screen', async () => {
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await expect(element(by.text('Vergleiche'))).toBeVisible();
  // });

  it('click throw all screens', async () => {
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    try {
      // TODO remove this try statement
      await element(by.id('PagerNextButton')).tap();
    } catch (e) {
      // android fallback
    }
    await waitFor(element(by.id('ListView'))).toBeVisible();
    await expect(element(by.id('ListView'))).toBeVisible();
  });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});
