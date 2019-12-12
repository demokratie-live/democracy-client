import React from 'react';
import { G, Text, Rect } from 'react-native-svg';

export interface BarChartValue {
  label: string;
  value: number;
  color: string;
}

interface Props {
  values: BarChartValue[];
  index: number;
  maxValue: number;
  barsNumber: number;
}

const BarColumn: React.FC<Props> = ({
  values,
  index,
  maxValue,
  barsNumber,
}) => {
  // Y Iterator startig from Bottom
  let barElementY = 100;

  // Width of one Bar
  const barWidth = 20;
  // Padding between the Bars, max 15
  const paddingInner = Math.min(
    Math.ceil((100 - barsNumber * barWidth) / (barsNumber - 1)),
    15,
  );
  // Padding on the Edges
  const paddingOuter =
    (100 - (paddingInner * (barsNumber - 1) + barWidth * barsNumber)) / 2;
  // Bar X Position
  const barX = paddingOuter + index * (paddingInner + barWidth);
  // MinSize for Text
  const minSizeForText = 7;
  // Text Size
  const textSize = 5;
  // Text Color
  const textColor = '#fff';
  // Text Anchor
  const textAnchor = 'middle';
  // Text x
  const textX = barWidth / 2;

  return (
    <G x={barX}>
      {values.map(({ label, value, color }) => {
        const barElementHeight = (value / maxValue) * 100;
        const textY = Math.ceil(barElementHeight / 2) + 1;
        barElementY -= barElementHeight;
        return (
          <G key={label} y={barElementY}>
            <Rect width={barWidth} height={barElementHeight} fill={color} />
            {barElementHeight >= minSizeForText && (
              <Text
                y={textY}
                fontSize={textSize}
                fill={textColor}
                textAnchor={textAnchor}
                x={textX}>
                {label}
              </Text>
            )}
          </G>
        );
      })}
    </G>
  );
};

export default BarColumn;
