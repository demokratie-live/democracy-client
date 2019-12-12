import React from 'react';
import Svg from 'react-native-svg';

// Components
import BarColumn, { BarChartValue } from './BarColumn';

export interface BarChartData {
  label: string;
  values: BarChartValue[];
}

interface Props {
  data: BarChartData[];
  width: number;
  maxHeight: number;
}

const BarChart: React.FC<Props> = ({ data, width, maxHeight }) => {
  const maxValue = data.reduce((maxSum, { values }) => {
    const barSum = values.reduce((sum, { value }) => sum + value, 0);
    return Math.max(maxSum, barSum);
  }, 0);
  return (
    <Svg
      viewBox="0 0 100 100"
      width={width}
      height={Math.min(maxHeight, width)}
      style={{}}>
      {data.map(({ label, values }, i) => (
        <BarColumn
          key={label}
          values={values}
          index={i}
          maxValue={maxValue}
          barsNumber={data.length}
        />
      ))}
    </Svg>
  );
};

export default BarChart;
