import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import Svg, { Path, Circle, Text, G } from 'react-native-svg';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  width: 100%;
`;

class PieChart extends Component {
  state = {
    width: 0,
  };
  onLayout = ({
    nativeEvent: {
      layout: { width },
    },
  }) => {
    if (this.state.width !== width) {
      this.setState({
        width,
      });
    }
  };

  getCoordinatesForPercent = percent => {
    if (percent === 1 && Platform.OS === 'android') {
      percent -= 0.00001;
    }
    const x = Math.cos(2 * Math.PI * percent) * 100;
    const y = Math.sin(2 * Math.PI * percent) * 100;
    return [x, y];
  };

  render() {
    const { data, label, subLabel, showPercentage } = this.props;
    const { width } = this.state;

    let cumulativePercent = 0;

    /**
     * source: https://hackernoon.com/a-simple-pie-chart-in-svg-dbdd653b6936
     */
    return (
      <Wrapper onLayout={this.onLayout}>
        <Svg
          viewBox="-100 -100 200 200"
          width={width}
          height={width}
          style={{ flex: 1, aspectRatio: 1 }}
        >
          <G transform="rotate(-90)">
            {data.map(({ percent, label, color }) => {
              if (percent === 0) {
                return null;
              }
              // destructuring assignment sets the two variables at once
              const [startX, startY] = this.getCoordinatesForPercent(cumulativePercent);

              const [labelX, labelY] = this.getCoordinatesForPercent(
                cumulativePercent + percent / 2,
              );

              // each slice starts where the last slice ended, so keep a cumulative percent
              cumulativePercent += percent;

              const [endX, endY] = this.getCoordinatesForPercent(cumulativePercent);

              // if the slice is more than 50%, take the large arc (the long way around)
              const largeArcFlag = percent > 0.5 ? 1 : 0;

              // create an array and join it just for code readability
              const pathData = [
                `M ${startX} ${startY}`, // Move
                `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0`, // Line
              ].join(' ');

              // create a <path>
              return (
                <G key={label}>
                  <Path d={pathData} fill={color} />
                  {showPercentage && percent > 0.05 && (
                    <Text
                      textAnchor="middle"
                      transform={`rotate(90, ${labelX * 0.7}, ${labelY * 0.7})`}
                      fontSize="10"
                      x={labelX * 0.7}
                      y={labelY * 0.7}
                      fill="#fff"
                    >
                      {`${parseFloat(percent * 100)
                        .toFixed(0)
                        .replace('.', ',')}%`}
                    </Text>
                  )}
                </G>
              );
            })}
          </G>

          {
            // TODO mask the circle
          }
          <Circle cx="0" cy="0" r="18%" fill="#fff" />

          {label.length > 0 && (
            <Text fill="#4a4a4a" fontSize="10" textAnchor="middle">
              {label}
            </Text>
          )}
          {subLabel && (
            <Text letterSpacing="0.01em" fill="#4a4a4a" y="5%" fontSize="7" textAnchor="middle">
              {subLabel}
            </Text>
          )}
        </Svg>
      </Wrapper>
    );
  }
}

PieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      percent: PropTypes.number.isRequired,
      value: PropTypes.number,
      total: PropTypes.number,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
  label: PropTypes.string,
  subLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  showPercentage: PropTypes.bool,
};

PieChart.defaultProps = {
  label: '',
  subLabel: false,
  showPercentage: true,
};

export default PieChart;