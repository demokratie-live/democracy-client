import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface Slice {
  percent: number;
  color: string;
  large?: boolean;
}

interface Props {
  data: Slice[];
  size: number;
}

const getCoordinatesForPercent = (percent: number) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);

  return [x, y];
};

export const PieChart: React.FC<Props> = ({ data, size }) => {
  let cumulativePercent = 0;
  const getPathData = ({
    percent,
    large,
  }: Pick<Slice, 'percent' | 'large'>) => {
    // destructuring assignment sets the two variables at once
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += percent;

    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    const larger = large ? 9 : 7.5;

    // create an array and join it just for code readability
    const pathData = [
      `M ${startX * larger} ${startY * larger}`,
      `A ${larger} ${larger} 0 ${largeArcFlag} 1 ${endX * larger} ${endY *
        larger}`,
      'L 0 0',
    ];

    const space = 0.3;

    return {
      path: pathData.join(','),
      // transform: large ? `${endY},${startX}` : '',
      transform: large
        ? `${((endY - startY) / percent) * space},${((startX - endX) /
            percent) *
            space}`
        : '',
    };
  };
  return (
    <Svg
      height={size}
      width={size}
      viewBox="-10 -10 20 20"
      style={{ transform: [{ rotate: '-90deg' }] }}>
      {data.map(({ color, percent, large }) => {
        const slice = getPathData({ percent, large });
        return (
          <Path
            key={color}
            d={slice.path}
            fill={color}
            transform={{ translate: slice.transform }}
          />
        );
      })}
    </Svg>
  );
};
