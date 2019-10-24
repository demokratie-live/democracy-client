import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, select } from '@storybook/addon-knobs';

import CenterView from '../../decorators/CenterView';
import NextButton, { ButtonTexts } from './NextButton';
import { Alert } from 'react-native';

storiesOf('Instruction', module)
  .addDecorator(CenterView)
  .addDecorator(withKnobs)
  .add('NextButton', () => {
    const slideSelected = select(
      'Slide',
      Object.keys(ButtonTexts),
      'next',
    ) as keyof typeof ButtonTexts;
    return (
      <NextButton
        text={slideSelected}
        click={() => Alert.alert('NextButton clicked 🎉')}
      />
    );
  });
