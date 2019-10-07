import React from 'react';

import { storiesOf } from '@storybook/react-native';

import Instruction from '.';
import CenterView from '../../decorators/CenterView';

storiesOf('Instruction', module)
  .addDecorator(CenterView)
  .add('Image Composition', () => <Instruction />);
