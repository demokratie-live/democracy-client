/* global element, by, expect, detox, config, device */

describe('Example', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await detox.init(config);
    }
    // await device.reloadReactNative();
  });

  // it('should have welcome screen', async () => {
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await element(by.text('Weiter')).tap();
  //   await expect(element(by.text('Vergleiche'))).toBeVisible();
  // });

  it('should have instruction screen', async () => {
    await expect(element(by.id('Instructions'))).toBeVisible();
  });

  it('should have instruction nex button', async () => {
    await expect(element(by.id('PagerNextButton'))).toBeVisible();
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
