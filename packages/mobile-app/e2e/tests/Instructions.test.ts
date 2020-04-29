import { by, device, expect, element, init } from 'detox';
const config = require('../../package.json').detox;

describe('Instructions', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    await device.launchApp({ delete: true });
  });

  it('click throw all screens', async () => {
    try {
      while (true) {
        await element(by.id('PagerNextButton')).tap();
      }
    } catch (e) {}
    await expect(element(by.id('PagerNextButton'))).toBeNotVisible();
  });
});
