import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import { ActivityIndicator, Dimensions } from 'react-native';
import { Navigator } from 'react-native-navigation';
import styled from 'styled-components/native';
// Components
import PartyChart from '../../components/Charts/PartyChart';
import ChartLegend from '../../components/Charts/ChartLegend';
// GraphQL
import VOTES_SELECTION_LOCAL from '../../graphql/queries/local/votesSelection';
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';
import NoConstituency from './NoConstituency';

const Wrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  padding-bottom: 18;
  color: #9b9b9b;
  font-size: 14;
  text-align: center;
`;

class Fraktionen extends PureComponent {
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

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  partyChartData = ({ votedProcedures, data }) => {
    const chartData = votedProcedures.proceduresByIdHavingVoteResults.procedures.reduce(
      (prev, { voteResults: { partyVotes }, procedureId }) => {
        const me = data.votesSelectionLocal.find(({ procedureId: pid }) => pid === procedureId)
          .selection;
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
    const { chartWidth, selected } = this.state;
    const { navigator } = this.props;
    return (
      <Query query={VOTES_SELECTION_LOCAL}>
        {({ data }) => {
          if (data.loading) {
            return <ActivityIndicator size="large" />;
          }
          if (!data.votesSelectionLocal || data.votesSelectionLocal.length === 0) {
            return <NoConstituency noButton navigator={navigator} />;
          }

          return (
            <Query
              query={PROCEDURES_WITH_VOTE_RESULTS}
              variables={{
                procedureIds: data.votesSelectionLocal.map(({ procedureId }) => procedureId),
                pageSize: 999999,
              }}
              fetchPolicy="cache-and-network"
            >
              {({ data: votedProcedures }) => {
                if (!votedProcedures || !votedProcedures.proceduresByIdHavingVoteResults) {
                  return <ActivityIndicator size="large" />;
                }

                if (votedProcedures.proceduresByIdHavingVoteResults.procedures.length === 0) {
                  return <NoConstituency noButton navigator={navigator} />;
                }

                const chartData = this.partyChartData({ votedProcedures, data });

                const chartLegendData = [
                  {
                    label: 'Übereinstimmungen',
                    value: chartData[selected].values[0].value,
                    color: '#f5a623',
                  },
                  {
                    label: 'Differenzen',
                    value: chartData[selected].values[1].value,
                    color: '#b1b3b4',
                  },
                ];

                // CHART
                return (
                  <Wrapper>
                    <Text>Deine derzeitige Übereinstimmung mit den Fraktionen</Text>
                    <PartyChart
                      width={chartWidth + 36}
                      chartData={chartData}
                      onClick={this.onClick}
                      selected={selected}
                      showPercentage
                    />
                    <ChartLegend data={chartLegendData} />
                  </Wrapper>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

Fraktionen.propTypes = {
  navigator: PropTypes.instanceOf(Navigator).isRequired,
};

Fraktionen.defaultProps = {};

export default Fraktionen;
