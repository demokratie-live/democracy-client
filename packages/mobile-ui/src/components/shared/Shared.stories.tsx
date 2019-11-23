import React from 'react';

import { storiesOf } from '@storybook/react-native';

import CenterView from '../../decorators/CenterView';
import { PieChart, Slice } from './Charts/PieChart';

storiesOf('Shared', module)
  .addDecorator(CenterView)
  .add('PieChart', () => {
    const data: Slice[] = [
      {
        percent: 0.3,
        color: 'blue',
        large: true,
      },
      {
        percent: 0.4,
        color: 'green',
      },
      {
        percent: 0.3,
        color: 'yellow',
      },
    ];
    return <PieChart data={data} size={200} />;
  })
  .add('PieChart empty', () => {
    return <PieChart size={200} />;
  });
