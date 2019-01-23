import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions, ActivityIndicator } from 'react-native';
import { Query } from 'react-apollo';
import styled from 'styled-components/native';

// Components
import PartyChart from '../../components/Charts/PartyChart';

// GraphQL
import VOTES_LOCAL from '../../graphql/queries/votesLocalKeyStore';
import PROCEDURES_WITH_VOTE_RESULTS from '../../graphql/queries/proceduresByIdHavingVoteResults';

const Wrapper = styled.View`
  align-items: center;
`;

const Text = styled.Text`
  padding-bottom: 18;
  color: #9b9b9b;
  font-size: 14;
  text-align: center;
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

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  };

  partyChartData = ({ votedProcedures, data }) => {
    const chartData = votedProcedures.proceduresByIdHavingVoteResults.procedures.reduce(
      (prev, { voteResults: { partyVotes }, procedureId }) => {
        const me = data.votesLocalKeyStore.find(({ procedureId: pid }) => pid === procedureId)
          .selection;
        partyVotes.forEach(({ party, main }) => {
          let matched = false;
          if (
            (me === 1 && main === 'YES') ||
            (me === 2 && main === 'ABSTINATION') ||
            (me === 3 && main === 'NO')
          ) {
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
    const { chartData } = this.props;
    const { chartWidth, selected } = this.state;
    return (
      <Query query={VOTES_LOCAL}>
        {({ data }) => {
          if (data.votesLocalKeyStore.length === 0) {
            return <ActivityIndicator size="large" />;
          }

          return (
            <Query
              query={PROCEDURES_WITH_VOTE_RESULTS}
              variables={{
                procedureIds: data.votesLocalKeyStore.map(({ procedureId }) => procedureId),
                pageSize: 999999,
              }}
              fetchPolicy="cache-and-network"
            >
              {({ data: votedProcedures }) => {
                if (
                  !votedProcedures ||
                  !votedProcedures.proceduresByIdHavingVoteResults ||
                  votedProcedures.proceduresByIdHavingVoteResults.procedures.length === 0
                ) {
                  return <ActivityIndicator size="large" />;
                }

                // CHART
                return (
                  <Wrapper>
                    <Text>Deine derzeitige Übereinstimmung mit den Fraktionen</Text>
                    <PartyChart
                      width={chartWidth + 36}
                      chartData={this.partyChartData({ votedProcedures, data })}
                      onClick={this.onClick}
                      selected={selected}
                      showPercentage
                    />
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
  chartData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default Fraktionen;
