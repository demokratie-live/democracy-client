import { by, device, expect, element, init, waitFor } from 'detox';
const config = require('../../package.json').detox;

describe('Verification', () => {
  beforeEach(async () => {
    if (typeof device === 'undefined') {
      await init(config);
    }
    await device.launchApp({ delete: true });

    // click throw instructions
    try {
      while (true) {
        await element(by.id('PagerNextButton')).tap();
      }
    } catch (e) {}
  });

  it('Szenario 1: Verifizieren via BurgerMenu/Profil', async () => {
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('unverifizierter Nutzer')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(200000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText('8899887313');
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('verifizierter Nutzer'))).toBeVisible();
  });
});
