import { by, device, expect, element, waitFor, init } from 'detox';
import { getSlides } from '../../src/screens/modals/Introduction/utils/getSlides';
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
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await device.takeScreenshot('test_screenshot');
    await expect(element(by.id('PagerNextButtonText'))).toHaveText(
      "Los geht's",
    );
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
