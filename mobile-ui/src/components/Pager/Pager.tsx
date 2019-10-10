import React, { useState } from 'react';
import {
  Text,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Dots } from './PageDots';

const DummySlide = ({ row }: { row: number }) => (
  <Text style={{ width: Dimensions.get('screen').width }}>Slide {row}</Text>
);

const data = [{ row: 1 }, { row: 2 }, { row: 3 }, { row: 4 }, { row: 5 }];

interface Dat {
  row: number;
}

export const Pager = () => {
  const [currentDot, setCurrentDot] = useState(0);
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetPosition = event.nativeEvent.contentOffset.x;
    let viewSize = event.nativeEvent.layoutMeasurement;

    setCurrentDot(offsetPosition / viewSize.width);
  };

  return (
    <>
      <FlatList
        horizontal
        onMomentumScrollEnd={handleScrollEnd}
        scrollEventThrottle={300}
        data={data}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <DummySlide row={item.row} />}
        keyExtractor={prop => prop.row.toString()}
      />
      <Dots length={data.length} current={currentDot} />
    </>
  );
};
