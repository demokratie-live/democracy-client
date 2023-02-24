import { BarChart } from '@democracy-deutschland/ui';
import React, { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import styled from 'styled-components/native';

import ChartLegend from '../Charts/ChartLegend';

const Wrapper = styled.View`
  align-items: center;
  /* margin-horizontal: 18px; */
`;

interface Props {
  width: number;
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

const PartyChartGov: React.FC<Props> = ({ chartData, width, ...props }) => {
  const [partyChartSelected, setPartyChartSelected] = useState(0);

  return (
    <Wrapper>
      <BarChart
        data={chartData.map(item => ({ ...item, deviants: item.values }))}
        {...props}
        setSelectedParty={setPartyChartSelected}
        selectedParty={partyChartSelected}
        width={width}
        height={315}
      />
      <ChartLegend data={chartData[partyChartSelected].values} />
    </Wrapper>
  );
};

export default PartyChartGov;
