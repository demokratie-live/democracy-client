import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import BarChartComponent, { BarChartData } from './BarChart/Component';
import ChartLegend, { ChartLegendData } from '../Charts/ChartLegend';
import { useState } from 'react';
import { Procedure_procedure_voteResults } from '../../graphql/query/__generated__/Procedure';

const Wrapper = styled.View`
  align-items: center;
`;

interface Props {
  data: Procedure_procedure_voteResults;
  legendData: ChartLegendData[];
}

const BarChart: React.FC<Props> = ({ data, legendData }) => {
  const [chartWidth, setChartWidth] = useState(
    Math.min(
      400,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    ),
  );

  const onLayout = () => {
    const newChartWidth = Math.min(
      400,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    );
    if (newChartWidth !== chartWidth) {
      setChartWidth(newChartWidth);
    }
  };

  const getPartyColor = (party: string) => {
    switch (party) {
      case 'Union':
        return '#4b4b4b';
      case 'SPD':
        return '#ed170d';
      case 'AfD':
        return '#18a7d8';
      case 'FDP':
        return '#ffd32c';
      case 'Linke':
        return '#aa4581';
      case 'Grüne':
        return '#34ac14';
      default:
        return 'grey';
    }
  };

  const prepareData = () => {
    const chartData: BarChartData[] = [
      {
        label: 'Zugestimmt',
        values: [],
      },
      {
        label: 'Enthalten',
        values: [],
      },
      {
        label: 'Ablehnung',
        values: [],
      },
      {
        label: 'Abwesend',
        values: [],
      },
    ];

    let preparedData = data.partyVotes.reduce((prev, { party, deviants }) => {
      const color = getPartyColor(party);
      chartData[0].values.push({
        label: party,
        value: deviants.yes || 0,
        color,
      });
      chartData[1].values.push({
        label: party,
        value: deviants.abstination || 0,
        color,
      });
      chartData[2].values.push({
        label: party,
        value: deviants.no || 0,
        color,
      });
      chartData[3].values.push({
        label: party,
        value: deviants.notVoted || 0,
        color,
      });
      return chartData;
    }, chartData);

    if (!data.namedVote) {
      preparedData.pop();
    }
    return preparedData;
  };

  const chartData = prepareData();

  return (
    <Wrapper onLayout={onLayout}>
      <BarChartComponent data={chartData} width={chartWidth} maxHeight={300} />
      <ChartLegend data={legendData} />
    </Wrapper>
  );
};

export default BarChart;
