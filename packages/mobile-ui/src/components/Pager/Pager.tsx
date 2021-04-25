import React, { useState, useRef, FC } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
  ScrollView,
} from 'react-native';
import { Dots as DotsComponent } from './PageDots';
import { NextButton } from './NextButton';
import styled from 'styled-components/native';

interface DotsProps {
  withButton?: boolean;
}

const Dots = styled(DotsComponent)<DotsProps>`
  bottom: ${({ withButton }) => (withButton ? '70' : '20')}px;
  /* background-color: #fff; */
`;

interface PropsBase {
  children: React.ReactElement<PageProps>[];
}

interface PropsWithButton extends PropsBase {
  nextButton: boolean;
  nextText: string;
  finishText: string;
  finishAction: () => void;
}

// FIX type safety does not work
// if one of the PropsWithButton are set, all other should also required
type Props = PropsBase | PropsWithButton;

function hasButton(
  props: PropsBase | PropsWithButton,
): props is PropsWithButton {
  return 'nextButton' in props;
}

export interface PageProps {
  nextPage?: () => void;
}

export const Pager: FC<Props> = props => {
  const [currentDot, setCurrentDot] = useState(0);
  const [pageWidth, setPageWidth] = useState(0);
  const scrollView = useRef<ScrollView>();

  const { children } = props;
  const length = children.length;

  const handleScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetPosition = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement;

    // TODO onMomentumScrollEnd workaround for android https://github.com/facebook/react-native/issues/21718
    // Replace onScroll with onMomentumScrollEnd when github issue is solved and remove if statement
    if ((offsetPosition / viewSize.width) % 1 < 0.001) {
      const curDot = Math.floor(offsetPosition / viewSize.width);
      setCurrentDot(curDot);
    }
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
        scrollEventThrottle={300}
        onLayout={onLayout}
        horizontal
        onScroll={handleScrollEnd}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={onContentSizeChange}
        contentContainerStyle={{ width: pageWidth * length }}>
        {children.map(child =>
          React.cloneElement<PageProps>(child, { nextPage }),
        )}
      </ScrollView>
      {hasButton(props) && (
        <NextButton
          text={length - 1 === currentDot ? props.finishText : props.nextText}
          click={length - 1 === currentDot ? props.finishAction : nextPage}
        />
      )}
      <Dots
        length={length}
        current={currentDot}
        withButton={hasButton(props)}
      />
    </>
  );
};
