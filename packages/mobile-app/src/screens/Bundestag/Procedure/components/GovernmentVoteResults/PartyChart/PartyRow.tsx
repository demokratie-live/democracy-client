import React from 'react';
import { G, Text, Rect } from 'react-native-svg';
import { theme } from '../../../../../../styles';

const WIDTH = 235;

export interface PartyChartRowValues {
  label: string;
  value: number;
  color: string;
}

interface Props {
  party: string;
  values: PartyChartRowValues[];
  colors: string[];
  index: number;
  showPercentage: boolean;
  onClick: (index: number) => () => void;
}

const PartyRow: React.FC<Props> = ({
  party,
  values,
  colors,
  index,
  showPercentage,
  onClick,
}) => {
  const total = values.reduce((sum, { value }) => {
    return sum + value;
  }, 0);

  // Prepare Data
  let preValues = 0;
  let rowValues = values.map(({ value, label }) => {
    const width = (value / total) * 100 + preValues;
    preValues = width;
    return {
      value: width,
      label,
    };
  });

  // reverse order of arrays because of rendering order
  rowValues.reverse();

  rowValues = rowValues.map(v => v);

  const getPercentagePosition =
    (WIDTH / 100) * rowValues[rowValues.length - 1].value;

  return (
    <G y={index * 46}>
      <Text fill="#4a4a4a" fontSize="13" x="50" y="23" textAnchor="end">
        {party}
      </Text>
      {/* <G x="62" y="8" width={`${WIDTH}`} height="20"> */}
      <G x="62" y="8">
        {rowValues.map(({ label, value }, i) => {
          return (
            <Rect
              key={label}
              x="0"
              y="0"
              width={(WIDTH / 100) * value}
              rx="3"
              ry="3"
              height="20"
              fill={colors[i]}
            />
          );
        })}
        {showPercentage && (
          <Text
            fill={theme.colors.tansparentSecondary}
            fontSize="12"
            x={
              rowValues[rowValues.length - 1].value > 18
                ? getPercentagePosition - 5
                : getPercentagePosition + 5
            }
            y="15"
            textAnchor={
              rowValues[rowValues.length - 1].value > 18 ? 'end' : 'start'
            }>
            {`${rowValues[rowValues.length - 1].value
              .toFixed(1)
              .replace('.', ',')}%`}
          </Text>
        )}
      </G>
      <Rect
        id={`clickable-${index}`}
        y="0"
        width="305"
        rx="3"
        ry="3"
        height="36"
        fill="red"
        fillOpacity="0.0"
        onPressIn={onClick(index)}
      />
    </G>
  );
};

export default PartyRow;
