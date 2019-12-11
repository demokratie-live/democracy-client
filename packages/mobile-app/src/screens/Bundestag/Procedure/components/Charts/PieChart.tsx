import React, { useState } from 'react';
import Svg, { Path, Circle, Text, G } from 'react-native-svg';
import styled from 'styled-components/native';
import { LayoutChangeEvent } from 'react-native';

const Wrapper = styled.View`
  width: 100%;
`;

const SvgStyled = styled(Svg)`
  flex: 1;
  aspect-ratio: 1;
`;

interface Props {
  data: {
    label?: string;
    percent: number;
    value?: number | null;
    total?: number | null;
    color: string;
  }[];
  label?: string;
  subLabel?: string;
  showPercentage?: boolean;
}

export const PieChart: React.FC<Props> = ({
  data,
  label,
  subLabel,
  showPercentage,
}) => {
  const [svgWidth, setSvgWidth] = useState(0);

  const onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }: LayoutChangeEvent) => {
    if (svgWidth !== width) {
      setSvgWidth(width);
    }
  };

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent) * 100;
    const y = Math.sin(2 * Math.PI * percent) * 100;
    return [x, y];
  };

  let cumulativePercent = 0;

  /**
   * source: https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936
   */
  return (
    <Wrapper onLayout={onLayout}>
      {// TODO This is a hack - rerendering should be controlled somewhere else
      svgWidth !== 0 && (
        <SvgStyled
          viewBox="-100 -100 200 200"
          width={svgWidth}
          height={svgWidth}>
          <G transform="rotate(-90)">
            {data.map(({ percent, label: sliceLabel, color }) => {
              if (percent === 0) {
                return null;
              }
              // destructuring assignment sets the two variables at once
              const [startX, startY] = getCoordinatesForPercent(
                cumulativePercent,
              );

              const [labelX, labelY] = getCoordinatesForPercent(
                cumulativePercent + percent / 2,
              );

              // each slice starts where the last slice ended, so keep a cumulative percent
              cumulativePercent += percent;

              // End coordinates - half circle for 100% (which is the labelX&Y)
              const [endX, endY] =
                percent === 1
                  ? [labelX, labelY]
                  : getCoordinatesForPercent(cumulativePercent);

              // if the slice is more than 50%, take the large arc (the long way around)
              // if the slice is 100%, take the small arc, since two halfs are drawn
              const largeArcFlag = percent !== 1 && percent > 0.5 ? 1 : 0;

              // create an array and join it just for code readability
              const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                percent === 1
                  ? `A 100 100 0 ${largeArcFlag} 1 ${startX} ${startY}`
                  : '', // Second half for 100%
                'L 0 0', // Line
              ].join(' ');

              // create a <path>
              return (
                <G key={sliceLabel}>
                  <Path d={pathData} fill={color} />
                  {showPercentage && percent > 0.05 && (
                    <Text
                      textAnchor="middle"
                      transform={`rotate(90, ${labelX * 0.7}, ${labelY * 0.7})`}
                      fontSize="10"
                      x={labelX * 0.7}
                      y={labelY * 0.7}
                      fill="#fff">
                      {`${(percent * 100).toFixed(0).replace('.', ',')}%`}
                    </Text>
                  )}
                </G>
              );
            })}
          </G>

          {
            // TODO mask the circle
          }
          <Circle cx="0" cy="0" r="18%" fill="#fff" />

          {label && label.length > 0 && (
            <Text fill="#4a4a4a" fontSize="10" textAnchor="middle">
              {label}
            </Text>
          )}
          {subLabel && (
            <Text
              letterSpacing="0.01em"
              fill="#4a4a4a"
              y="5%"
              fontSize="7"
              textAnchor="middle">
              {subLabel}
            </Text>
          )}
        </SvgStyled>
      )}
    </Wrapper>
  );
};

export default PieChart;
