import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, select } from '@storybook/addon-knobs';

import CenterView from '../../decorators/CenterView';
import NextButton, { ButtonTexts } from './NextButton';

storiesOf('Instruction', module)
  .addDecorator(CenterView)
  .addDecorator(withKnobs)
  .add('NextButton', () => {
    const slideSelected = select(
      'Slide',
      Object.keys(ButtonTexts),
      ButtonTexts.next,
    ) as keyof typeof ButtonTexts;

    return <NextButton text={slideSelected} />;
  });
