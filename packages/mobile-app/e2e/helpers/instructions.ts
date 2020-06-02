import { by, element } from 'detox';

export const clickThrowInstructions = async () => {
  // click throw instructions
  console.log('HELPER clickThrowInstructions');
  try {
    while (true) {
      await element(by.id('PagerNextButton')).tap();
    }
  } catch (e) {}
};
