import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';

// Components
import PartyChart from '../../../components/Charts/PartyChart';
import ChartLegend from '../../../components/Charts/ChartLegend';
import Header from '../Header';
import ChartNote from '../ChartNote';
import VotedProceduresWrapper from '../VotedProceduresWrapper';
import ListSectionHeader from '../../../components/ListSectionHeader';

const ChartWrapper = styled.View`
  padding-horizontal: 18;
  padding-top: 18;
  align-self: center;
  width: 100%;
  max-width: ${() => Math.min(Dimensions.get('window').width, Dimensions.get('window').height)};
`;

class Fraktionen extends Component {
  state = {
    chartWidth: Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height),
    selected: 0,
  };
  onLayout = () => {
    const chartWidth = Math.min(Dimensions.get('screen').width, Dimensions.get('screen').height);
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };

  onClick = index => () => {
    this.setState({ selected: index });
  };

  // Filtered Array of procedures voted local
  getMatchingProcedures = ({ votedProcedures, localVotes }) =>
    votedProcedures.proceduresByIdHavingVoteResults.procedures.filter(({ procedureId }) =>
      localVotes.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId),
    );

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  partyChartData = ({ localVotes, matchingProcedures }) => {
    const chartData = matchingProcedures.reduce(
      (prev, { voteResults: { partyVotes }, procedureId }) => {
        const me = localVotes.votesSelectionLocal.find(
          ({ procedureId: pid }) => pid === procedureId,
        ).selection;
        partyVotes.forEach(({ party, main }) => {
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
      },
      {},
    );
    return Object.keys(chartData)
      .map(key => ({
        party: key,
        values: [
          { label: 'Übereinstimmungen', value: chartData[key].matches },
          { label: 'Differenzen', value: chartData[key].diffs },
        ],
      }))
      .sort((a, b) => b.values[0].value - a.values[0].value);
  };

  render() {
    const { onProcedureListItemClick, navigator } = this.props;
    const { chartWidth, selected } = this.state;

    return (
      <VotedProceduresWrapper
        onProcedureListItemClick={onProcedureListItemClick}
        navigator={navigator}
      >
        {({ totalProcedures, chartData }) => {
          const matchingProcedures = this.getMatchingProcedures(chartData);

          const preparedData = this.partyChartData({ ...chartData, matchingProcedures });

          const chartLegendData = [
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
          return (
            <>
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
                />
                <ChartLegend data={chartLegendData} />
                <ChartNote>
                  Hohe Übereinstimmungen Ihrer Stellungnahmen mit mehreren Parteien bedeuten nicht
                  zwangsläufig eine inhaltliche Nähe dieser Parteien zueinander
                </ChartNote>
              </ChartWrapper>
              <ListSectionHeader title="Abstimmungen" />
            </>
          );
        }}
      </VotedProceduresWrapper>
    );
  }
}

Fraktionen.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
  onProcedureListItemClick: PropTypes.func.isRequired,
};

export default Fraktionen;
