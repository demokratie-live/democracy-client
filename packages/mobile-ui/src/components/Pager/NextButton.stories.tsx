import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text } from '@storybook/addon-knobs';

import CenterView from '../../decorators/CenterView';
import { NextButton } from './NextButton';
import { Alert } from 'react-native';

storiesOf('Instruction', module)
  .addDecorator(CenterView)
  .addDecorator(withKnobs)
  .add('NextButton', () => {
    const buttonText = text('Text', 'next');
    return (
      <NextButton
        text={buttonText}
        click={() => Alert.alert('NextButton clicked 🎉')}
      />
    );
  });
