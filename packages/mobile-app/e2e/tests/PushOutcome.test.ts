import { by, device, expect, element, init } from 'detox';
import { clickThrowInstructions } from '../helpers';
const config = require('../../package.json').detox;

describe('Push Outcome', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    await device.launchApp({
      delete: true,
      permissions: { notifications: 'YES' },
    });
  });

  it('disable push settings', async () => {
    await clickThrowInstructions();

    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('Settings')).tap();
    try {
      await expect(element(by.id('outcomePushsSwitch'))).toHaveValue('0');
    } catch (error) {
      await element(by.id('outcomePushsSwitch')).tap();
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
    await expect(element(by.id('outcomePushsSwitch'))).toHaveValue('0');
  });

  it(':ios: aktivate push by instructions', async () => {
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();
    await element(by.id('PagerNextButton')).tap();

    await element(by.text('Aktivieren')).tap();
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('Settings')).tap();
    await expect(element(by.id('outcomePushsSwitch'))).toHaveValue('1');

    await new Promise(resolve => setTimeout(resolve, 1000));
    await element(by.id('outcomePushsSwitch')).tap();

    await new Promise(resolve => setTimeout(resolve, 1000));
    await expect(element(by.id('outcomePushsSwitch'))).toHaveValue('0');
  });
});
