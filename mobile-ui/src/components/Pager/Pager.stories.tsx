import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Pager } from './Pager';
import { SafeAreaView, Text } from 'react-native';
import { slidesData, Screen } from '../Instruction/data';
import Slide from '../Instruction/Slide';

const DummySlide = ({ row }: { row: number }) => (
  <Text style={{ flex: 2 }}>Slide {row}</Text>
);

storiesOf('Pager', module)
  .add('dummy', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Pager>
        {[
          <DummySlide row={1} key="1" />,
          <DummySlide row={2} key="2" />,
          <DummySlide row={3} key="3" />,
          <DummySlide row={4} key="4" />,
          <DummySlide row={5} key="5" />,
        ]}
      </Pager>
    </SafeAreaView>
  ))
  .add('Instructions', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Pager>
        {Object.keys(slidesData).map(screen => (
          <Slide
            key={screen}
            head={slidesData[screen as Screen].head}
            images={slidesData[screen as Screen].images}
            nextPage={() => {}}
            isNew={slidesData[screen as Screen].isNew}
          />
        ))}
      </Pager>
    </SafeAreaView>
  ));
