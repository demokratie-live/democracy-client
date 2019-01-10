import React from 'react';
import Svg, { G, Text, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

const PartyRow = ({ party, values, colors, index, onClick }) => {
  const total = values.reduce((sum, { value }) => {
    return sum + value;
  }, 0);

  // Prepare Data
  let preValues = 0;
  const rowValues = values.map(({ value, label }) => {
    const width = value / total * 100 + preValues;
    preValues = width;
    return {
      value: width,
      label,
    };
  });

  // reverse order of arrays because of rendering order
  rowValues.reverse();
  colors.reverse();

  const getPercentagePosition = rowValues[rowValues.length - 1].value;
  return (
    <G y={index * 46}>
      <Rect
        y="0"
        width="305"
        rx="3"
        ry="3"
        height="36"
        fill="black"
        fillOpacity="0"
        onPressIn={onClick(index)}
      />
      <Text fill="#4a4a4a" fontSize="13" x="50" y="23" textAnchor="end">
        {party}
      </Text>
      <G x="62" y="8">
        <Svg viewBox="0 0 235 20" width="235" height="20">
          {rowValues.map(({ label, value }, i) => {
            return (
              <Rect
                key={label}
                x="0"
                y="0"
                width={`${value}%`}
                rx="3"
                ry="3"
                height="20"
                fill={colors[i]}
              />
            );
          })}
          <Text
            fill="#4a4a4a"
            fontSize="12"
            x={
              getPercentagePosition > 18
                ? `${getPercentagePosition - 2}%`
                : `${getPercentagePosition + 2}%`
            }
            y="15"
            textAnchor={getPercentagePosition > 18 ? 'end' : 'start'}
          >
            {`${parseFloat(rowValues[rowValues.length - 1].value)
              .toFixed(1)
              .replace('.', ',')}%`}
          </Text>
        </Svg>
      </G>
    </G>
  );
};

PartyRow.propTypes = {
  party: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.shape()),
  colors: PropTypes.arrayOf(PropTypes.string),
};

PartyRow.defaultProps = {
  values: [{ label: 'Übereinstimmungen', value: 15 }, { label: 'Differenzen', value: 85 }],
  colors: ['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4'],
};

export default PartyRow;
