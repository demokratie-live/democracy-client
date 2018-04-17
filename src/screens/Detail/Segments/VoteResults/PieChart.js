import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import { VictoryPie } from "victory-native";

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
  justify-content: space-between;
`;

const VoteResult = styled.View`
  justify-content: center;
  align-items: center;
  width: 88;
`;

const VoteResultNumber = styled.Text`
  color: #4a4a4a;
  font-size: 12;
`;
const VoteResultLabel = styled.Text`
  color: #d5d5d5;
  font-size: 10;
`;

class PieChart extends Component {
  state = {
    width: Dimensions.get("window").width - 18 * 2
  };

  getLabel = label => {
    const labels = {
      yes: "Ja",
      abstination: "Enthalten",
      no: "Nein",
      notVote: "Nicht abg."
    };
    return labels[label] || label;
  };

  render() {
    const { data, colorScale, label } = this.props;
    const { width } = this.state;
    return (
      <VoteResultsWrapper
        onLayout={({ nativeEvent: { layout: { width: newWidth } } }) =>
          this.setState({ width: newWidth })
        }
      >
        <VoteResultsPieWrapper>
          <VictoryPie
            allowZoom={false}
            padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
            width={width}
            height={width}
            colorScale={colorScale}
            data={data.map((entry, index) => ({
              x: index,
              y: entry.value,
              label: " "
            }))}
            innerRadius={width / 5.6}
          />
          <VoteResult style={{ position: "absolute" }}>
            <VoteResultPieValue>
              {data.reduce((v, { value }) => v + value, 0)}
            </VoteResultPieValue>
            <VoteResultPieLabel>{label}</VoteResultPieLabel>
          </VoteResult>
          {/* Andoid scroll fix */}
          <View
            style={{
              zIndex: 9999,
              position: "absolute",
              width: "100%",
              height: "100%"
            }}
          />
        </VoteResultsPieWrapper>
        <VoteResultNumbers>
          {data.map(entry => (
            <VoteResult key={entry.label}>
              <VoteResultNumber>{entry.value}</VoteResultNumber>
              <VoteResultLabel>{this.getLabel(entry.label)}</VoteResultLabel>
            </VoteResult>
          ))}
        </VoteResultNumbers>
      </VoteResultsWrapper>
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

PieChart.defaultProps = {};

export default PieChart;
