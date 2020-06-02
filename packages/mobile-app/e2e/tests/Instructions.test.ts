import { by, device, expect, element, init } from 'detox';
import { clickThrowInstructions } from '../helpers';
const config = require('../../package.json').detox;

describe('Instructions', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    await device.launchApp({ delete: true });
  });

  it('click throw all screens', async () => {
    await clickThrowInstructions();
    await expect(element(by.id('PagerNextButton'))).toBeNotVisible();
  });
});
