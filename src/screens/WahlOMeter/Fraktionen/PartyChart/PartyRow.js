import React from 'react';
import Svg, { G, Text, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

const PartyRow = ({ party, values, colors, index }) => {
  //
  const total = values.reduce((sum, { value }) => {
    return sum + value;
  }, 0);
  let preValues = 0;
  const rowValues = values.map(({ value }) => {
    const width = value / total * 100 + preValues;
    preValues = width;
    return {
      value: width,
    };
  });
  rowValues.reverse();
  return (
    <G>
      <Rect y="0" width="305" rx="3" ry="3" height="36" fill="#ededed" />
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
        </Svg>
      </G>
      <Text fill="#4a4a4a" fontSize="12" x="203" y="23" textAnchor="end">
        62,6%
      </Text>
    </G>
  );
};

PartyRow.propTypes = {
  party: PropTypes.string.isRequired,
  values: PropTypes.shape(),
  colors: PropTypes.arrayOf(PropTypes.string),
};

PartyRow.defaultProps = {
  values: [{ label: 'Übereinstimmungen', value: 40 }, { label: 'Differenzen', value: 80 }],
  colors: ['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4'],
};

export default PartyRow;
