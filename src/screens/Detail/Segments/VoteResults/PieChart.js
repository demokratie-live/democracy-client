import React, { Component } from 'react';
import { Dimensions, Platform } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { VictoryPie, VictoryLabel } from 'victory-native';
import Svg, { G } from 'react-native-svg';

const VoteResultsWrapper = styled.View`
  flex: 1;
  align-items: center;
`;

const VoteResultsPieWrapper = styled.View.attrs({
  pointerEvents: 'none',
})``;

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

class PieChart extends Component {
  state = {
    pieChartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  };

  onLayout = () => {
    const pieChartWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    if (this.state.pieChartWidth !== pieChartWidth) {
      this.setState({
        pieChartWidth,
      });
    }
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

  getValue = ({ value, fractions }) => (typeof fractions === 'number' ? fractions : value);

  render() {
    const { data, colorScale, label, showNumbers } = this.props;
    const { pieChartWidth } = this.state;
    return (
      <VoteResultsWrapper>
        <VoteResultsPieWrapper onLayout={this.onLayout}>
          <Svg
            width={pieChartWidth}
            height={pieChartWidth}
            viewBox="0 0 400 400"
            style={{
              width: '100%',
              maxWidth: 400,
              height: 'auto',
              maxHeight: 350,
            }}
          >
            <VictoryPie
              standalone={false}
              height={400}
              width={400}
              allowZoom={false}
              padding={{ left: 18, top: 0, bottom: 0, right: 18 }}
              colorScale={colorScale}
              data={data.map((entry, index) => ({
                x: index,
                y: entry.value,
                label: entry.percentage >= 5 ? `${entry.percentage}%` : ' ',
              }))}
              innerRadius={pieChartWidth / 5.6}
              labelRadius={pieChartWidth / 3.3}
              style={{
                labels: {
                  fill: 'white',
                  fontSize: 20,
                  fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Thin' : 'sans-serif-light',
                },
              }}
            />
            <G>
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 17,
                  color: '#4a4a4a',
                }}
                dy={-10}
                x={200}
                y={200}
                text={data.reduce(
                  (v, { value, fractions }) =>
                    typeof fractions === 'number' ? v + fractions : v + value,
                  0,
                )}
              />
            </G>
            <G>
              <VictoryLabel
                textAnchor="middle"
                style={{
                  fontSize: 11,
                  color: '#4a4a4a',
                }}
                dy={10}
                x={200}
                y={200}
                text={label}
              />
            </G>
          </Svg>
        </VoteResultsPieWrapper>
        {showNumbers && (
          <VoteResultNumbers>
            {data.map(entry => (
              <VoteResult key={entry.label}>
                <VoteResultCircleNumber>
                  <VoteResultCircle color={this.getColor(entry.label, colorScale)} />
                  <VoteResultNumber>{this.getValue(entry)}</VoteResultNumber>
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
      label: PropTypes.string,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  colorScale: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  showNumbers: PropTypes.bool,
};

PieChart.defaultProps = {
  showNumbers: true,
};

export default PieChart;
