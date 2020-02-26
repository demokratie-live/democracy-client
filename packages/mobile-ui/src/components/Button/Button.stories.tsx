import React from 'react';
import { View } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';

import { Button } from '../Button';
import CenterView from '../../decorators/CenterView';

storiesOf('Button', module)
  .addDecorator(CenterView)
  .add('red | transparent', () => (
    <View style={{ width: '100%' }}>
      <Button
        onPress={action('clicked-text')}
        text="Hello Button"
        textColor="red"
      />
    </View>
  ))
  .add('white | blue', () => (
    <View style={{ width: '100%' }}>
      <Button
        onPress={action('clicked-emoji')}
        text="Hello Button"
        textColor="white"
        backgroundColor="blue"
      />
    </View>
  ))
  .add('white | red', () => (
    <View style={{ width: '100%' }}>
      <Button
        onPress={action('clicked-emoji')}
        text="Hello Button"
        textColor="white"
        backgroundColor="red"
      />
    </View>
  ))
  .add('blue | transparent', () => (
    <View style={{ width: '100%' }}>
      <Button
        onPress={action('clicked-emoji')}
        text="Hello Button"
        textColor="blue"
      />
    </View>
  ));
