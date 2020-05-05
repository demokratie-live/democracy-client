import { by, device, expect, element, init, waitFor } from 'detox';
const config = require('../../package.json').detox;

const getRandomNumber = () => {
  const min = 111111111;
  const max = 9999999999999;
  return (Math.random() * (max - min) + min).toString();
};

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
      .withTimeout(10000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('verifizierter Nutzer'))).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  it('Szenario 2: Verifizieren via BurgerMenu/Settings', async () => {
    await element(by.id('BurgerMenuButton')).tap();

    await element(by.text('Settings')).tap();
    await waitFor(element(by.id('Verifizieren')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('Verifizieren')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('Verifiziert'))).toBeVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });

  it('Szenario 3: Verifizieren via Abstimmen', async () => {
    await element(by.id('ListItem-CONFERENCEWEEKS_PLANNED-0')).tap();

    await element(by.id('ProcedureScrollView')).scrollTo('bottom');

    await element(by.id('VerificationTouch')).tap();

    await waitFor(element(by.id('StartVerificationButton')))
      .toBeVisible()
      .withTimeout(10000);
    await element(by.id('StartVerificationButton')).tap();

    await element(by.id('VerificationPhoneInput')).typeText(getRandomNumber());
    await element(by.id('VerificationCodeButton')).tap();

    await element(by.text('Ja')).tap();
    await element(by.id('VerificationCodeInput')).typeText('000001');
    await element(by.text('OK')).tap();
    await element(by.id('VerificationCodeInput')).clearText();

    await element(by.id('VerificationCodeInput')).typeText('000000');

    await element(by.text('Später')).tap();

    await expect(element(by.text('VerificationTouch'))).toBeNotVisible();
    await new Promise(resolve => setTimeout(resolve, 3000));
  });
});
