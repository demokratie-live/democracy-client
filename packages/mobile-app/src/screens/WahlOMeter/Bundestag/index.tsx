import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

// Components
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper, { ChartData } from '../VotedProceduresWrapper';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PieChart from '../../Bundestag/Procedure/components/Charts/PieChart';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';
import { Segment } from '../../Bundestag/List/Components/Segment';
import { ChainEntry } from '../../../lib/VotesLocal';
import { proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures } from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';
import { WahlOMeterScreenNavigationProp } from '..';

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
const getMatchingProcedures = ({ votedProcedures, localVotes }: ChartData) =>
  votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(
    ({ procedureId }) =>
      localVotes.find(({ procedureId: pid }) => pid === procedureId),
  );

const pieChartData = ({
  localVotes,
  matchingProcedures,
}: {
  localVotes: ChainEntry[];
  matchingProcedures: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures[];
}) => {
  // Pie Chart Data Preparation
  const pieDataRaw = matchingProcedures.map(({ voteResults, procedureId }) => {
    const userVote = localVotes.find(
      ({ procedureId: pid }) => pid === procedureId,
    );
    return {
      government: voteResults ? voteResults.governmentDecision : undefined,
      me: userVote ? userVote.selection : undefined,
    };
  });
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

interface Props {
  navigation: WahlOMeterScreenNavigationProp;
}

class Bundestag extends PureComponent<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={({ item }) =>
          navigation.navigate('Procedure', {
            procedureId: item.procedureId,
            title: item.type || item.procedureId,
          })
        }>
        {({ totalProcedures, chartData }) => {
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
                    showPercentage
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
