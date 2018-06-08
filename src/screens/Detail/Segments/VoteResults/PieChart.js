import React, { Component } from "react";
import { View, Dimensions, Platform } from "react-native";
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

class PieChart extends Component {
  state = {
    width: Dimensions.get("window").width - 18 * 2
  };

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
  }

  getLabel = label => {
    const labels = {
      yes: "Zustimmungen",
      abstination: "Enthaltungen",
      no: "Ablehnungen",
      notVote: "Nicht abg."
    };
    return labels[label] || label;
  };

  render() {
    const { data, colorScale, label, showNumbers } = this.props;
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
              label: entry.percentage >= 5 ? `${entry.percentage}%` : " "
            }))}
            innerRadius={width / 5.6}
            labelRadius={width / 3.3}
            style={{
              labels: {
                fill: "white",
                fontSize: 16,
                fontFamily: Platform.OS === "ios"
                  ? "HelveticaNeue-Thin"
                  : "sans-serif-light"

              }
            }}
          />
          <VoteResult style={{ position: "absolute" }}>
            {showNumbers && (
              <VoteResultPieValue>
                {data.reduce((v, { value }) => v + value, 0)}
              </VoteResultPieValue>
            )}
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
        {showNumbers && (
          <VoteResultNumbers>
            {data.map(entry => (
              <VoteResult key={entry.label}>
                <VoteResultCircleNumber>
                  <VoteResultCircle color={this.getColor(entry.label, colorScale)} />
                  <VoteResultNumber>
                    {(entry.value !== null ? entry.value : "?")}
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
      label: PropTypes.string
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showNumbers: PropTypes.bool
};

PieChart.defaultProps = {
  showNumbers: true
};

export default PieChart;
