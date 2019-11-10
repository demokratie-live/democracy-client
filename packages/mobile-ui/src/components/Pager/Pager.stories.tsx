import React from 'react';

import { storiesOf } from '@storybook/react-native';

import { Pager } from './Pager';
import { SafeAreaView, Text } from 'react-native';
import { slidesData, Screen } from '../Introduction/data';
import { Slide } from '../Introduction/Slide';

const DummySlide = ({ row }: { row: number }) => (
  <Text style={{ flex: 2 }}>Slide {row}</Text>
);

storiesOf('Pager', module)
  .add('simple', () => (
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
  .add('next Button', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Pager nextButton nextText="Weiter" finishText="Los geht's">
        {[
          <DummySlide row={1} key="1" />,
          <DummySlide row={2} key="2" />,
          <DummySlide row={3} key="3" />,
        ]}
      </Pager>
    </SafeAreaView>
  ))
  .add('Instructions', () => (
    <SafeAreaView style={{ flex: 1 }}>
      <Pager nextButton nextText="Weiter" finishText="Los geht's">
        {Object.keys(slidesData).map(screen => (
          <Slide
            key={screen}
            head={slidesData[screen as Screen].head}
            images={slidesData[screen as Screen].images}
            nextSlide={() => {
              console.log('custom next page');
            }}
            isNew={slidesData[screen as Screen].isNew}
          />
        ))}
      </Pager>
    </SafeAreaView>
  ));
