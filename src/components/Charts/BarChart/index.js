import React from 'react';
import Svg from 'react-native-svg';
import PropTypes from 'prop-types';

// Components
import BarRow from './BarRow';

const BarChart = ({ data, width }) => {
  const maxValue = data.reduce((maxSum, { values }) => {
    const barSum = values.reduce((sum, { value }) => sum + value, 0);
    return Math.max(maxSum, barSum);
  }, 0);
  return (
    <Svg viewBox="0 0 100 100" width={width} height={width} style={{ flex: 1, aspectRatio: 1 }}>
      {data.map(({ label, values }, i) => (
        <BarRow
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

BarChart.propTypes = {
  width: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          color: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
        }),
      ).isRequired,
    }),
  ).isRequired,
};

BarChart.defaultProps = {};

export default BarChart;
