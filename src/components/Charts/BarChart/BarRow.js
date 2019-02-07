import React from 'react';
import { G, Text, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

const BarRow = ({ values, index, maxValue, barsNumber }) => {
  let prevY = 100;

  const barWidth = 20;
  const padding = Math.ceil((100 - barsNumber * barWidth) / (barsNumber - 1));

  return (
    <G x={padding * index + index * barWidth}>
      {values.map(({ label, value, color }) => {
        const height = (value / maxValue) * 100;

        prevY -= height;
        return (
          <G key={label} y={prevY}>
            <Rect width={barWidth} height={height} fill={color} />
            {height > 6 && (
              <Text y="6" fontSize="5" fill="#fff" textAnchor="middle" x={barWidth / 2}>
                {label}
              </Text>
            )}
          </G>
        );
      })}
    </G>
  );
};

BarRow.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.number.isRequired,
          color: PropTypes.string.isRequired,
        }),
      ),
    }),
  ).isRequired,
  index: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  barsNumber: PropTypes.number.isRequired,
};

BarRow.defaultProps = {};

export default BarRow;
