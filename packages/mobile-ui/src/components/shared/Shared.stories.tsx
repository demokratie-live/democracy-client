import React from 'react';

import { storiesOf } from '@storybook/react-native';

import CenterView from '../../decorators/CenterView';
import { PieChart, Slice } from './Charts/PieChart';

storiesOf('Shared', module)
  .addDecorator(CenterView)
  .add('PieChart', () => {
    const data: Slice[] = [
      {
        percent: 0.2,
        color: '#16c063',
      },
      {
        percent: 0.4,
        color: '#2882e4',
      },
      {
        percent: 0.4,
        color: '#ec3e31',
        large: true,
      },
    ];
    return <PieChart data={data} size={200} />;
  })
  .add('PieChart empty', () => {
    return <PieChart size={200} />;
  });
