import React from 'react';
import Svg, { Path } from 'react-native-svg';

export interface Slice {
  percent: number;
  color: string;
  large?: boolean;
}

interface Props {
  data: Slice[];
}

const getCoordinatesForPercent = (percent: number) => {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);

  return [x, y];
};

export const PieChart: React.FC<Props> = ({ data = [] }) => {
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

    const larger = large ? 10 : 9;

    // create an array and join it just for code readability
    const pathData = [
      `M ${startX * larger} ${startY * larger}`,
      `A ${larger} ${larger} 0 ${largeArcFlag} 1 ${endX * larger} ${endY *
        larger}`,
      'L 0 0',
    ];

    return pathData.join(',');
  };
  return (
    <Svg height="200" width="200" viewBox="-10 -10 20 20">
      {data.map(({ color, percent, large }) => {
        const pathData = getPathData({ percent, large });
        return <Path key={color} d={pathData} fill={color} />;
      })}
    </Svg>
  );
};
