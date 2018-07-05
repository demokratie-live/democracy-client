import React, { Component } from "react";
import { View, Dimensions, Platform } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictorySharedEvents,
  VictoryGroup,
  VictoryTheme
} from "victory-native";
import victoryAxis from "victory-native/lib/components/victory-axis";

const VoteResultsWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const VoteResultsPieWrapper = styled.View`
  justify-content: center;
  align-items: center;
`;

const VoteResultPieValue = styled.Text`
  font-size: 17;
  color: #4a4a4a;
`;

const VoteResultPieLabel = styled.Text`
  font-size: 11;
  color: #4a4a4a;
  padding-top: 3;
`;

const VoteResultNumbers = styled.View`
  width: ${() => Dimensions.get("window").width - 18 * 2};
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
  color: #d5d5d5;
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

const TouchableBar = styled.TouchableOpacity`
  background-color: red;
`;

const AxisLabel = styled.Text``;

class PieChart extends Component {
  state = {
    width: Dimensions.get("window").width - 18 * 2
  };

  getColor = (label, colors) => {
    switch (label) {
      case "yes":
        return colors[0];
      case "abstination":
        return colors[1];
      case "no":
        return colors[2];
      default:
        return colors[3];
    }
  };

  getLabel = label => {
    const labels = {
      yes: "Zustimmungen",
      abstination: "Enthaltungen",
      no: "Ablehnungen",
      notVoted: "Nicht abg."
    };
    return labels[label] || label;
  };

  getPartyColor = party => {
    switch (party) {
      case "CDU/CSU":
        return "#4b4b4b";
      case "SPD":
        return "#ed170d";
      case "AfD":
        return "#18a7d8";
      case "FDP":
        return "#ffd32c";
      case "Die Linke":
        return "#aa4581";
      case "B90/Grüne":
        return "#34ac14";
      default:
        return "grey";
    }
  };

  getTotals = data => {
    const totals = data.reduce(
      (prev, party) => {
        const { yes, abstination, no, notVoted } = party.value;
        return {
          yes: prev.yes + yes,
          abstination: prev.abstination + abstination,
          no: prev.no + no,
          notVoted: prev.notVoted + notVoted
        };
      },
      { yes: 0, abstination: 0, no: 0, notVoted: 0 }
    );
    return [
      {
        label: "yes",
        value: totals.yes
      },
      {
        label: "abstination",
        value: totals.abstination
      },
      {
        label: "no",
        value: totals.no
      },
      {
        label: "notVoted",
        value: totals.notVoted
      }
    ];
  };

  prepareChartData = data => {
    console.log("DATA", data);
    const chartData = data.map(party => {
      const { yes, abstination, no, notVoted } = party.value;
      console.log(party.label);
      return [
        {
          x: "Zustimmungen",
          y: yes,
          fillColor: this.getPartyColor(party.label)
        },
        {
          x: "Enthaltungen",
          y: abstination,
          fillColor: this.getPartyColor(party.label)
        },
        {
          x: "Ablehnungen",
          y: no,
          fillColor: this.getPartyColor(party.label)
        },
        {
          x: "Nicht abg.",
          y: notVoted,
          fillColor: this.getPartyColor(party.label)
        }
      ];
    });
    return chartData;
  };

  labelStyle = (...rest) => {
    console.log(rest);
    return {
      color: "blue"
    };
  };

  render() {
    const { data, colorScale, label, showNumbers } = this.props;
    const { width } = this.state;
    const dataSet = this.prepareChartData(data);
    console.log({ dataSet });
    return (
      <VoteResultsWrapper
        onLayout={({ nativeEvent: { layout: { width: newWidth } } }) =>
          this.setState({ width: newWidth - 18 * 2 })
        }
      >
        <VoteResultsPieWrapper>
          <VictoryChart padding={{ left: 50, top: 0, bottom: 25, right: 50 }}>
            <VictoryStack>
              {dataSet.map((chartData, i) => (
                <VictoryBar
                  // width={340}
                  key={chartData[0].y}
                  barRatio={1.5}
                  data={chartData}
                  style={{
                    data: {
                      fill: d => {
                        if (!d.fillColor) {
                          // console.log("STYLE VictoryBar", d);
                        }
                        return d.fillColor;
                      }
                    }
                  }}
                />
              ))}
            </VictoryStack>
            <VictoryAxis
              style={{
                tickLabels: { fontWeight: "100", padding: 5 }
              }}
            />
          </VictoryChart>
        </VoteResultsPieWrapper>
        {showNumbers && (
          <VoteResultNumbers>
            {this.getTotals(data).map(entry => (
              <VoteResult key={entry.label}>
                <VoteResultCircleNumber>
                  <VoteResultCircle
                    color={this.getColor(entry.label, colorScale)}
                  />
                  <VoteResultNumber>
                    {entry.value !== null ? entry.value : "?"}
                  </VoteResultNumber>
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

PieChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  label: PropTypes.string.isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showNumbers: PropTypes.bool
};

PieChart.defaultProps = {
  showNumbers: true
};

export default PieChart;
