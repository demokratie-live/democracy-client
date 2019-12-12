import React from 'react';
import Svg, { Rect } from 'react-native-svg';

// Components
import PartyRow, { PartyChartRowValues } from './PartyRow';
import styled from 'styled-components/native';

const SvgStyled = styled(Svg).attrs({
  style: {
    flex: 1,
  },
})``;

export interface PartyChartChartData {
  party: string;
  // label: string;
  values: PartyChartRowValues[];
}

interface Props {
  width: number;
  chartData: PartyChartChartData[];
  selected: number;
  colors: string[];
  showPercentage: boolean;
  onClick: (index: number) => () => void;
}

const PartyChart: React.FC<Props> = ({
  width,
  chartData,
  onClick,
  selected,
  colors,
  showPercentage,
}) => {
  return (
    <SvgStyled
      width={width - 2 * 18}
      height={chartData.length * 46}
      viewBox={`0 0 305 ${chartData.length * 46}`}>
      <Rect
        y={selected * 46}
        width="305"
        rx="3"
        ry="3"
        height="36"
        fill="#ededed"
      />
      {chartData.map(({ party, values }, i) => (
        <PartyRow
          key={party}
          party={party}
          values={values}
          index={i}
          onClick={onClick}
          colors={colors}
          showPercentage={showPercentage}
        />
      ))}
    </SvgStyled>
  );
};

export default PartyChart;
