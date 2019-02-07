import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

// Components
import PieChart from '../../../components/Charts/PieChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper from '../VotedProceduresWrapper';
import ListSectionHeader from '../../../components/ListSectionHeader';

const ChartWrapper = styled.View`
  padding-horizontal: 36;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(400, Dimensions.get('window').width, Dimensions.get('window').height)};
`;

const pieChartData = ({ votedProcedures, data }) => {
  // Pie Chart Data Preparation
  let pieDataRaw = votedProcedures.proceduresByIdHavingVoteResults.procedures.map(
    ({ voteResults, procedureId }) => ({
      government: voteResults.governmentDecision,
      me: data.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId).selection,
    }),
  );
  const pieData = pieDataRaw.reduce(
    (pre, { government, me }) => {
      if (me === government) {
        return { ...pre, matches: pre.matches + 1, count: pre.count + 1 };
      } else {
        return { ...pre, diffs: pre.diffs + 1, count: pre.count + 1 };
      }
    },
    { matches: 0, diffs: 0, count: 0 },
  );
  return [
    {
      label: 'Übereinstimmungen',
      percent: pieData.matches / pieData.count,
      value: pieData.matches,
      total: pieData.count,
      color: '#f5a623',
    },
    {
      label: 'Differenzen',
      percent: pieData.diffs / pieData.count,
      value: pieData.diffs,
      total: pieData.count,
      color: '#b1b3b4',
    },
  ];
};

const Bundestag = ({
  chartData,
  totalProcedures,
  votedProceduresCount,
  onProcedureListItemClick,
}) => {
  const preparedData = pieChartData(chartData);

  return (
    <VotedProceduresWrapper onProcedureListItemClick={onProcedureListItemClick}>
      <>
        <Header totalProcedures={totalProcedures} votedProceduresCount={votedProceduresCount} />
        <ChartWrapper>
          <PieChart
            data={preparedData}
            colorScale={['#EAA844', '#B1B3B4']}
            label="Bundestag"
            subLabel="Wahl-O-Meter"
          />
        </ChartWrapper>
        <ChartLegend data={preparedData} />
        <ChartNote>
          Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten eine inhaltliche
          Nähe zu den Regierungsfraktionen
        </ChartNote>
        <ListSectionHeader title="Abstimmungen" />
      </>
    </VotedProceduresWrapper>
  );
};

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
  totalProcedures: PropTypes.number.isRequired,
  votedProceduresCount: PropTypes.number.isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Bundestag;
