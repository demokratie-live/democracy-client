import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// Components
import PieChart from '../../../components/Charts/PieChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresList from '../VotedProceduresList';

const Wrapper = styled.ScrollView`
  background-color: #fff;
  padding-top: 18;
  width: ${Dimensions.get('screen').width};
`;

const ChartWrapper = styled.View`
  flex: 1;
  padding-horizontal: 18;
  padding-top: 18;
  min-height: 150;
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

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  return (
    <Wrapper
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          if (this.procedureList.fetchMore) this.procedureList.fetchMore();
        }
      }}
      scrollEventThrottle={4000}
    >
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
      <ChartNote>
        Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten eine inhaltliche Nähe
        zu den Regierungsfraktionen
      </ChartNote>
      <VotedProceduresList
        onItemClick={onProcedureListItemClick}
        ref={el => (this.procedureList = el)}
      />
    </Wrapper>
  );
};

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
  totalProcedures: PropTypes.number.isRequired,
  votedProceduresCount: PropTypes.number.isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Bundestag;
