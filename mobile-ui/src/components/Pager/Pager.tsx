import React, { useState, useRef, FC } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { Dots } from './PageDots';
import { Props as SlideProps } from '../Instruction/Slide';

interface Dat {
  row: number;
}

interface Props {
  children: React.ReactElement<SlideProps>[];
}

export const Pager: FC<Props> = ({ children }) => {
  const [currentDot, setCurrentDot] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollView = useRef<ScrollView>();
  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetPosition = event.nativeEvent.contentOffset.x;
    let viewSize = event.nativeEvent.layoutMeasurement;

    setCurrentDot(offsetPosition / viewSize.width);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setPageWidth(width);
  };
  const onContentSizeChange = () => {
    if (scrollView.current) {
      // BUG scroll always back to first screen
      scrollView.current.scrollTo(undefined, currentDot * pageWidth, false);
    }
  };

  const nextPage = () => {
    if (scrollView.current) {
      scrollView.current.scrollTo({
        x: (currentDot + 1) * pageWidth,
      });
    }
  };
  return (
    <>
      <ScrollView
        ref={scrollView as any}
        onLayout={onLayout}
        horizontal
        onMomentumScrollEnd={handleScrollEnd}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={{ width: pageWidth * children.length }}>
        {children.map(child =>
          React.cloneElement<SlideProps>(child, { nextPage }),
        )}
      </ScrollView>
      <Dots length={children.length} current={currentDot} />
    </>
  );
};
