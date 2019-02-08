import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';

// Components
import PieChart from '../../../components/Charts/PieChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper from '../VotedProceduresWrapper';
import ListSectionHeader from '../../../components/ListSectionHeader';

const Wrapper = styled.View`
  padding-top: 18;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 36;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(400, Dimensions.get('window').width, Dimensions.get('window').height)};
`;

// Filtered Array of procedures voted local
const getMatchingProcedures = ({ votedProcedures, localVotes }) =>
  votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(({ procedureId }) =>
    localVotes.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId),
  );

const pieChartData = ({ localVotes, matchingProcedures }) => {
  // Pie Chart Data Preparation
  let pieDataRaw = matchingProcedures.map(({ voteResults, procedureId }) => ({
    government: voteResults.governmentDecision,
    me: localVotes.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId)
      .selection,
  }));
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

const Bundestag = ({ onProcedureListItemClick, navigator }) => {
  return (
    <VotedProceduresWrapper
      onProcedureListItemClick={onProcedureListItemClick}
      navigator={navigator}
    >
      {({ totalProcedures, chartData }) => {
        const matchingProcedures = getMatchingProcedures(chartData);
        const preparedData = pieChartData({ ...chartData, matchingProcedures });

        return (
          <Wrapper>
            <Header
              totalProcedures={totalProcedures}
              votedProceduresCount={matchingProcedures.length}
            />
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
              Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag bedeuten eine
              inhaltliche Nähe zu den Regierungsfraktionen
            </ChartNote>
            <ListSectionHeader title="Abstimmungen" />
          </Wrapper>
        );
      }}
    </VotedProceduresWrapper>
  );
};

Bundestag.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Bundestag;
