import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Pager } from './Pager';
import { SafeAreaView } from 'react-native';

storiesOf('Pager', module).add('Pager', () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Pager />
  </SafeAreaView>
));
