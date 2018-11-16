import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { VictoryChart, VictoryBar, VictoryStack, VictoryAxis, VictoryLabel } from 'victory-native';

const VoteResultsWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const VoteResultsPieWrapper = styled.View.attrs(() => ({
  pointerEvents: 'none',
}))``;

const VoteResultNumbers = styled.View`
  width: ${() => Dimensions.get('window').width - 18 * 2};
  max-width: 464;
  padding-top: 18;
  flex-direction: row;
  justify-content: space-around;
`;

const VoteResult = styled.View`
  justify-content: center;
  align-items: center;
`;

const VoteResultCircleNumber = styled.View`
  flex-direction: row;
`;

const VoteResultNumber = styled.Text`
  color: #4a4a4a;
  font-size: 12;
`;
const VoteResultLabel = styled.Text`
  color: rgb(142, 142, 147);
  font-size: 10;
`;

const VoteResultCircle = styled.View`
  width: 10;
  height: 10;
  border-radius: 5;
  background-color: ${props => props.color};
  margin-top: 3;
  margin-right: 5;
`;

class BarChart extends Component {
  getColor = (label, colors) => {
    switch (label) {
      case 'yes':
        return colors[0];
      case 'abstination':
        return colors[1];
      case 'no':
        return colors[2];
      default:
        return colors[3];
    }
  };

  getLabel = label => {
    const labels = {
      yes: 'Zustimmungen',
      abstination: 'Enthaltungen',
      no: 'Ablehnungen',
      notVoted: 'Nicht abg.',
    };
    return labels[label] || label;
  };

  getPartyColor = party => {
    switch (party) {
      case 'CDU/CSU':
      case 'Union':
        return '#4b4b4b';
      case 'SPD':
        return '#ed170d';
      case 'AfD':
      case 'AFD':
        return '#18a7d8';
      case 'FDP':
        return '#ffd32c';
      case 'Die Linke':
      case 'Linke':
        return '#aa4581';
      case 'B90/Grüne':
      case 'Grüne':
        return '#34ac14';
      default:
        return 'grey';
    }
  };

  getTotals = data => {
    const { voteResults: { namedVote } } = this.props;
    const totals = data.reduce(
      (prev, party) => {
        const { yes, abstination, no, notVoted } = party.value;
        if (namedVote) {
          return {
            yes: prev.yes + yes,
            abstination: prev.abstination + abstination,
            no: prev.no + no,
            notVoted: prev.notVoted + notVoted,
          };
        }
        return {
          yes: prev.yes + (yes === Math.max(yes, abstination, no, notVoted) ? 1 : 0),
          abstination:
            prev.abstination + (abstination === Math.max(yes, abstination, no, notVoted) ? 1 : 0),
          no: prev.no + (no === Math.max(yes, abstination, no, notVoted) ? 1 : 0),
          notVoted: prev.notVoted + (notVoted === Math.max(yes, abstination, no, notVoted) ? 1 : 0),
        };
      },
      { yes: 0, abstination: 0, no: 0, notVoted: 0 },
    );
    const totalsResult = [
      {
        label: 'yes',
        value: totals.yes,
      },
      {
        label: 'abstination',
        value: totals.abstination,
      },
      {
        label: 'no',
        value: totals.no,
      },
    ];
    if (totals.notVoted) {
      totalsResult.push({
        label: 'notVoted',
        value: totals.notVoted,
      });
    }

    return totalsResult;
  };

  prepareChartData = data => {
    const chartData = data.map(party => {
      const { yes, abstination, no, notVoted } = party.value;
      const result = [
        {
          x: 'Zustimmungen',
          y: yes,
          fillColor: this.getPartyColor(party.label),
          party: party.label,
        },
        {
          x: 'Enthaltungen',
          y: abstination,
          fillColor: this.getPartyColor(party.label),
          party: party.label,
        },
        {
          x: 'Ablehnungen',
          y: no,
          fillColor: this.getPartyColor(party.label),
          party: party.label,
        },
      ];

      if (notVoted) {
        result.push({
          x: 'Nicht abg.',
          y: notVoted,
          fillColor: this.getPartyColor(party.label),
          party: party.label,
        });
      }

      return result;
    });
    return chartData;
  };

  labelStyle = () => ({
    color: 'blue',
  });

  render() {
    const { data, colorScale, showNumbers } = this.props;
    const dataSet = this.prepareChartData(data);
    return (
      <VoteResultsWrapper>
        <VoteResultsPieWrapper>
          <VictoryChart
            width={320}
            height={350}
            padding={{ left: 50, top: 18, bottom: 0, right: 50 }}
          >
            <VictoryStack>
              {dataSet.map(chartData => (
                <VictoryBar
                  key={chartData[0].y}
                  barRatio={1.5}
                  data={chartData}
                  labels={d => {
                    if (d.y >= 40) {
                      return d.party;
                    }
                    return '';
                  }}
                  labelComponent={<VictoryLabel dy={30} />}
                  style={{
                    labels: { fill: 'white' },
                    data: {
                      fill: d => {
                        if (d.y === 0) {
                          return '#fff';
                        }
                        return d.fillColor;
                      },
                    },
                  }}
                />
              ))}
            </VictoryStack>
            <VictoryAxis
              tickFormat={() => ''}
              style={{
                axis: { stroke: 'none' },
                tickLabels: { fontWeight: '100', padding: 5 },
              }}
            />
          </VictoryChart>
        </VoteResultsPieWrapper>
        {showNumbers && (
          <VoteResultNumbers>
            {this.getTotals(data).map(entry => (
              <VoteResult key={entry.label}>
                <VoteResultCircleNumber>
                  <VoteResultCircle color={this.getColor(entry.label, colorScale)} />
                  <VoteResultNumber>{entry.value !== null ? entry.value : '?'}</VoteResultNumber>
                </VoteResultCircleNumber>
                <VoteResultLabel>{this.getLabel(entry.label)}</VoteResultLabel>
              </VoteResult>
            ))}
          </VoteResultNumbers>
        )}
      </VoteResultsWrapper>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showNumbers: PropTypes.bool,
  voteResults: PropTypes.shape().isRequired,
};

BarChart.defaultProps = {
  showNumbers: true,
};

export default BarChart;
