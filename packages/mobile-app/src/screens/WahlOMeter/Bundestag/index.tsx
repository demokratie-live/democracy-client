import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';

// Components
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper from '../VotedProceduresWrapper';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PieChart from '../../Bundestag/Procedure/components/Charts/PieChart';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';
import { Segment } from '../../Bundestag/List/Components/Segment';

const Wrapper = styled.View`
  padding-top: 18;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 36;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(
      400,
      Dimensions.get('window').width,
      Dimensions.get('window').height,
    )};
`;

// Filtered Array of procedures voted local
const getMatchingProcedures = ({ votedProcedures, localVotes }: any) =>
  votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(
    ({ procedureId }: any) =>
      localVotes.votesSelectionLocal.find(
        ({ procedureId: pid }: any) => pid === procedureId,
      ),
  );

const pieChartData = ({ localVotes, matchingProcedures }: any) => {
  // Pie Chart Data Preparation
  const pieDataRaw = matchingProcedures.map(
    ({ voteResults, procedureId }: any) => ({
      government: voteResults.governmentDecision,
      me: localVotes.votesSelectionLocal.find(
        ({ procedureId: pid }: any) => pid === procedureId,
      ).selection,
    }),
  );
  const pieData = pieDataRaw.reduce(
    (pre: any, { government, me }: any) => {
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

class Bundestag extends PureComponent {
  render() {
    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={() => Alert.alert('navigate to procedure')}
        navigator={navigator}>
        {({ totalProcedures, chartData }: any) => {
          const matchingProcedures = getMatchingProcedures(chartData);
          const preparedData = pieChartData({
            ...chartData,
            matchingProcedures,
          });

          if (matchingProcedures.length > 0) {
            return (
              <Wrapper>
                <Header
                  totalProcedures={totalProcedures}
                  votedProceduresCount={matchingProcedures.length}
                />
                <ChartWrapper>
                  <PieChart
                    data={preparedData}
                    // colorScale={['#EAA844', '#B1B3B4']}
                    label="Bundestag"
                    subLabel="Wahl-O-Meter"
                  />
                </ChartWrapper>
                <ChartLegend data={preparedData} />
                <ChartNote>
                  Hohe Übereinstimmungen Ihrer Stellungnahmen mit dem Bundestag
                  bedeuten eine inhaltliche Nähe zu den Regierungsfraktionen
                </ChartNote>
                <Segment text="Abstimmungen" />
              </Wrapper>
            );
          }
          return (
            <>
              <NoVotesPlaceholder subline="Bundestag" />
              <Segment text="Abstimmungen" />
            </>
          );
        }}
      </VotedProceduresWrapper>
    );
  }
}

export default Bundestag;
