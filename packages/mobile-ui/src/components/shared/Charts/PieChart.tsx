import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface Slice {
  percent: number;
  color: string;
  large?: boolean;
  space?: number | false;
}

interface Props {
  data: Slice[];
  size: number;
  large?: boolean;
}

const getCoordinatesForPercent = (percent: number) => {
  const percentageEnshured = percent ? percent : 0;
  const x = Math.cos(2 * Math.PI * percentageEnshured);
  const y = Math.sin(2 * Math.PI * percentageEnshured);

  return [x, y];
};

export const PieChart: React.FC<Props> = ({ data, size, large = false }) => {
  let cumulativePercent = 0;
  const getPathData = ({
    percent,
    large: largeSlice,
    space = 0.3,
  }: Pick<Slice, 'percent' | 'large' | 'space'>) => {
    // destructuring assignment sets the two variables at once
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);

    const [labelX, labelY] = getCoordinatesForPercent(
      cumulativePercent + percent / 2,
    );

    // each slice starts where the last slice ended, so keep a cumulative percent
    cumulativePercent += percent;

    const [endX, endY] =
      percent === 1
        ? [labelX, labelY]
        : getCoordinatesForPercent(cumulativePercent);

    // if the slice is more than 50%, take the large arc (the long way around)
    const largeArcFlag = percent !== 1 && percent > 0.5 ? 1 : 0;

    const larger = largeSlice || large ? 9 : 7.5;

    // create an array and join it just for code readability
    const pathData = [
      `M ${startX * larger} ${startY * larger}`,
      `A ${larger} ${larger} 0 ${largeArcFlag} 1 ${endX * larger} ${endY *
        larger}`, // Arc
      percent === 1
        ? `A ${larger} ${larger} 0 ${largeArcFlag} 1 ${startX *
            larger} ${startY * larger}`
        : '', // Second half for 100%
      'L 0 0',
    ].join(' ');

    const sliceSpace = space ? space : 0;
    return {
      path: pathData,
      // transform: large ? `${endY},${startX}` : '',
      transform: largeSlice
        ? `${((endY - startY) / percent) * sliceSpace},${((startX - endX) /
            percent) *
            sliceSpace}`
        : '',
    };
  };
  return (
    <Svg
      height={size}
      width={size}
      viewBox="-10 -10 20 20"
      style={{ transform: [{ rotate: '-90deg' }] }}>
      {data.map(({ color, percent, large: largeSlice }) => {
        const slice = getPathData({ percent, large: largeSlice });
        return (
          <Path
            key={`${color}-${largeSlice}`}
            d={slice.path}
            fill={color}
            transform={{ translate: slice.transform }}
          />
        );
      })}
    </Svg>
  );
};
