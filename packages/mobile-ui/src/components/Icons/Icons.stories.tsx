import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Document, Funnel } from '../Icons';
import CenterView from '../../decorators/CenterView';
import SvgImage from './Image';

storiesOf('Icons', module)
  .addDecorator(CenterView)
  .add('Document', () => (
    <Document color="black" height="100px" width="100px" />
  ))
  .add('Funnel', () => <Funnel color="black" height="100px" width="100px" />)
  .add('Image', () => <SvgImage color="black" height="100px" width="100px" />);
