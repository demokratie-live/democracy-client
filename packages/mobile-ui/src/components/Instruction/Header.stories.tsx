import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { withKnobs, text, files } from '@storybook/addon-knobs';

import CenterView from '../../decorators/CenterView';
import Header from './Header';

storiesOf('Instruction', module)
  .addDecorator(CenterView)
  .addDecorator(withKnobs)
  .add('Header', () => {
    const title = text('Title', 'The Title');
    const description = text('Description', 'The Description');

    const value = files('Images', '.png');

    const image = value.length
      ? { uri: value[0] }
      : require('./assets/icon.logo.png');

    return <Header title={title} description={description} image={image} />;
  });
