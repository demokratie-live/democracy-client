import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import BarChartComponent from '../../../../../components/Charts/BarChart';
import ChartLegend from '../../../../../components/Charts/ChartLegend';

const Wrapper = styled.View`
  align-items: center;
`;

class BarChart extends Component {
  state = {
    chartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
  };

  onLayout = () => {
    const chartWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
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

  prepareData = data => {
    const chartData = [
      {
        label: 'Zugestimmt',
        values: [],
      },
      {
        label: 'Enthalten',
        values: [],
      },
      {
        label: 'Ablehnung',
        values: [],
      },
      {
        label: 'Nicht Abgestimmt',
        values: [],
      },
    ];

    let preparedData = data.partyVotes.reduce((prev, { party, deviants }) => {
      const color = this.getPartyColor(party);
      chartData[0].values.push({
        label: party,
        value: deviants.yes,
        color,
      });
      chartData[1].values.push({
        label: party,
        value: deviants.abstination,
        color,
      });
      chartData[2].values.push({
        label: party,
        value: deviants.no,
        color,
      });
      chartData[3].values.push({
        label: party,
        value: deviants.notVoted || 0,
        color,
      });
      return chartData;
    }, chartData);

    if (!data.namedVote) {
      preparedData.pop();
    }
    return preparedData;
  };

  render() {
    const { data, legendData } = this.props;
    const { chartWidth } = this.state;

    const chartData = this.prepareData(data);

    return (
      <Wrapper onLayout={this.onLayout}>
        <BarChartComponent data={chartData} width={chartWidth - 36} />
        <ChartLegend data={legendData} />
      </Wrapper>
    );
  }
}

BarChart.propTypes = {
  data: PropTypes.shape().isRequired,
  legendData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

BarChart.defaultProps = {};

export default BarChart;
