import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// Components
import PieChart from './PieChart';
import ChartLegend from './ChartLegend';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  padding-horizontal: 18;
  padding-top: 18;
  padding-bottom: 9;
`;

const ChartWrapper = styled.View`
  flex: 1;
`;

const Bundestag = ({ chartData }) => {
  const data = [
    {
      label: 'Übereinstimmungen',
      percent: chartData.matches / chartData.count,
      value: chartData.matches,
      total: chartData.count,
      color: '#f5a623',
    },
    {
      label: 'Differenzen',
      percent: chartData.diffs / chartData.count,
      value: chartData.diffs,
      total: chartData.count,
      color: '#b1b3b4',
    },
  ];

  return (
    <Wrapper>
      <ChartWrapper>
        <PieChart
          data={data}
          colorScale={['#EAA844', '#B1B3B4']}
          label="Bundestag"
          subLabel={`Wahl-\u00D8-Meter`}
        />
      </ChartWrapper>
      <ChartLegend data={data} />
    </Wrapper>
  );
};

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
};

export default Bundestag;
