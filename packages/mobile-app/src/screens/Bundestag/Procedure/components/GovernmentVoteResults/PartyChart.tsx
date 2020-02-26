import React, { useState } from 'react';
import styled from 'styled-components/native';

import PartyChartComponent, {
  PartyChartChartData,
} from './PartyChart/Component';
import ChartLegend from '../Charts/ChartLegend';

const Wrapper = styled.View`
  align-items: center;
`;

interface Props {
  width: number;
  chartData: PartyChartChartData[];
  colors: string[];
  showPercentage: boolean;
}

const PartyChartGov: React.FC<Props> = ({ chartData, ...props }) => {
  const [partyChartSelected, setPartyChartSelected] = useState(0);

  const partyChartClick = (index: number) => () => {
    setPartyChartSelected(index);
  };

  return (
    <Wrapper>
      <PartyChartComponent
        chartData={chartData}
        {...props}
        onClick={partyChartClick}
        selected={partyChartSelected}
        showPercentage
      />
      <ChartLegend data={chartData[partyChartSelected].values} />
    </Wrapper>
  );
};

export default PartyChartGov;
