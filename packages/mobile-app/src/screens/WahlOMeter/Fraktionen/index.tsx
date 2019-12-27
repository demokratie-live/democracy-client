import React, { PureComponent } from 'react';
import styled from 'styled-components/native';
import { Dimensions, Alert } from 'react-native';

// Components

import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper, { ChartData } from '../VotedProceduresWrapper';
import NoVotesPlaceholder from '../NoVotesPlaceholder';
import PartyChart from '../../Bundestag/Procedure/components/GovernmentVoteResults/PartyChart/Component';
import ChartLegend from '../../Bundestag/Procedure/components/Charts/ChartLegend';
import { Segment } from '../../Bundestag/List/Components/Segment';
import { ChainEntry } from '../../../lib/VotesLocal';
import {
  proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures,
  proceduresByIdHavingVoteResults,
} from '../../Bundestag/Procedure/Voting/components/graphql/query/__generated__/proceduresByIdHavingVoteResults';

const Wrapper = styled.View`
  padding-top: 18;
`;

const ChartWrapper = styled.View`
  padding-horizontal: 18;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() =>
    Math.min(Dimensions.get('window').width, Dimensions.get('window').height)};
`;

class Fraktionen extends PureComponent {
  state = {
    chartWidth: Math.min(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    ),
    selected: 0,
  };
  onLayout = () => {
    const chartWidth = Math.min(
      Dimensions.get('screen').width,
      Dimensions.get('screen').height,
    );
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };

  onClick = (index: number) => () => {
    this.setState({ selected: index });
  };

  // Filtered Array of procedures voted local
  getMatchingProcedures = ({ votedProcedures, localVotes }: ChartData) =>
    votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(
      ({ procedureId }) =>
        localVotes.find(({ procedureId: pid }) => pid === procedureId),
    );

  partyChartData = ({
    localVotes,
    matchingProcedures,
  }: {
    matchingProcedures: proceduresByIdHavingVoteResults_proceduresByIdHavingVoteResults_procedures[];
    votedProcedures: proceduresByIdHavingVoteResults;
    localVotes: ChainEntry[];
  }) => {
    const chartData = matchingProcedures.reduce<{
      [party: string]: { diffs: number; matches: number };
    }>((prev, { voteResults, procedureId }) => {
      if (!voteResults) {
        return prev;
      }
      const { partyVotes } = voteResults;
      const userVote = localVotes.find(
        ({ procedureId: pid }) => pid === procedureId,
      );
      const me = userVote ? userVote.selection : undefined;
      partyVotes.forEach(({ party, main }) => {
        if (party === 'fraktionslos') {
          return prev;
        }
        let matched = false;
        if (me === main) {
          matched = true;
        }

        if (prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              matches: prev[party].matches + 1,
            },
          };
        } else if (prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              ...prev[party],
              diffs: prev[party].diffs + 1,
            },
          };
        } else if (!prev[party] && matched) {
          prev = {
            ...prev,
            [party]: {
              diffs: 0,
              matches: 1,
            },
          };
        } else if (!prev[party] && !matched) {
          prev = {
            ...prev,
            [party]: {
              matches: 0,
              diffs: 1,
            },
          };
        }
      });
      return prev;
    }, {});
    return Object.keys(chartData)
      .map(key => ({
        party: key,
        values: [
          {
            label: 'Übereinstimmungen',
            value: chartData[key].matches,
            color: '#f5a623',
          },
          {
            label: 'Differenzen',
            value: chartData[key].diffs,
            color: '#b1b3b4',
          },
        ],
      }))
      .sort((a, b) => b.values[0].value - a.values[0].value);
  };

  prepareCharLegendData = (
    preparedData: {
      party: string;
      values: {
        label: string;
        value: number;
        color: string;
      }[];
    }[],
  ) => {
    const { selected } = this.state;
    return [
      {
        label: 'Übereinstimmungen',
        value: preparedData[selected].values[0].value,
        color: '#f5a623',
      },
      {
        label: 'Differenzen',
        value: preparedData[selected].values[1].value,
        color: '#b1b3b4',
      },
    ];
  };

  render() {
    const { chartWidth, selected } = this.state;

    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={() => Alert.alert('navigate to procedure')}>
        {({ totalProcedures, chartData }) => {
          const matchingProcedures = this.getMatchingProcedures(chartData);

          const preparedData = this.partyChartData({
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
                  <PartyChart
                    width={chartWidth}
                    chartData={preparedData}
                    onClick={this.onClick}
                    selected={selected}
                    showPercentage
                    colors={['#b1b3b4', '#f5a623']}
                  />
                  <ChartLegend
                    data={this.prepareCharLegendData(preparedData)}
                  />
                  <ChartNote>
                    Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren
                    Parteien bedeuten nicht zwangsläufig eine inhaltliche Nähe
                    dieser Parteien zueinander
                  </ChartNote>
                </ChartWrapper>

                <Segment text="Abstimmungen" />
              </Wrapper>
            );
          }
          return (
            <>
              <NoVotesPlaceholder subline="Fraktionen" />
              <Segment text="Abstimmungen" />
            </>
          );
        }}
      </VotedProceduresWrapper>
    );
  }
}

export default Fraktionen;
