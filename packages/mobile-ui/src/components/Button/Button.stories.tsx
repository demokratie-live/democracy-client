import React from 'react';
import { View } from 'react-native';

import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';
import CenterView from '../../decorators/CenterView';

storiesOf('Button', module)
  .addDecorator(CenterView)
  .addDecorator(withKnobs)
  .add('red | transparent', () => {
    const title = text('Button', 'Button Title');
    return (
      <View style={{ width: '100%' }}>
        <Button onPress={action('clicked-text')} text={title} textColor="red" />
      </View>
    );
  })
  .add('white | blue', () => {
    const title = text('Button', 'Button Title');
    return (
      <View style={{ width: '100%' }}>
        <Button
          onPress={action('clicked-emoji')}
          text={title}
          textColor="white"
          backgroundColor="blue"
        />
      </View>
    );
  })
  .add('white | red', () => {
    const title = text('Button', 'Button Title');
    return (
      <View style={{ width: '100%' }}>
        <Button
          onPress={action('clicked-emoji')}
          text={title}
          textColor="white"
          backgroundColor="red"
        />
      </View>
    );
  })
  .add('blue | transparent', () => {
    const title = text('Button', 'Button Title');
    return (
      <View style={{ width: '100%' }}>
        <Button
          onPress={action('clicked-emoji')}
          text={title}
          textColor="blue"
        />
      </View>
    );
  });
