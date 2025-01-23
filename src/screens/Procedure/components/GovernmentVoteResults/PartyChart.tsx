import { BarChart } from '@democracy-deutschland/ui';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import ChartLegend from '../Charts/ChartLegend';

const Wrapper = styled.View`
  align-items: center;
  /* margin-horizontal: 18px; */
`;

interface Props {
  chartData: {
    party: string;
    values: {
      label: string;
      value: number;
      color: string;
    }[];
  }[];
  colors: string[];
  showPercentage: boolean;
}

const PartyChartGov: React.FC<Props> = ({ chartData, ...props }) => {
  const [partyChartSelected, setPartyChartSelected] = useState(0);
  const [svgWidth, setSvgWidth] = useState(0);

  const onLayout = () => {
    const { width, height } = Dimensions.get('screen');
    const size = Math.min(...[width, height].filter(v => v));

    if (svgWidth !== size - size * 0.3) {
      setSvgWidth(size - size * 0.3);
    }
  };
  return (
    <Wrapper onLayout={onLayout}>
      <BarChart
        data={chartData.map(item => ({ ...item, deviants: item.values }))}
        {...props}
        setSelectedParty={setPartyChartSelected}
        selectedParty={partyChartSelected}
        width={svgWidth}
        height={315}
      />
      <ChartLegend data={chartData[partyChartSelected].values} />
    </Wrapper>
  );
};

export default PartyChartGov;
