import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// Components
import PieChart from '../../../components/Charts/PieChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import VotedProceduresList from '../VotedProceduresList';

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

const Bundestag = ({
  chartData,
  totalProcedures,
  votedProceduresCount,
  onProcedureListItemClick,
}) => {
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
      <Header totalProcedures={totalProcedures} votedProceduresCount={votedProceduresCount} />
      <ChartWrapper>
        <PieChart
          data={data}
          colorScale={['#EAA844', '#B1B3B4']}
          label="Bundestag"
          subLabel={`Wahl-\u00D8-Meter`}
        />
      </ChartWrapper>
      <ChartLegend data={data} />
      <VotedProceduresList onItemClick={onProcedureListItemClick} />
    </Wrapper>
  );
};

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
};

export default Bundestag;
