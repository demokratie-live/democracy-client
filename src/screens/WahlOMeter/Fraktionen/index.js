import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

// Components
// import PartyChart from './PartyChart';
import PartyChart from './PartyChart';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

class Fraktionen extends Component {
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
  render() {
    const { chartData } = this.props;
    const { chartWidth } = this.state;
    return (
      <Wrapper onLayout={this.onLayout}>
        {/* <Debug>{JSON.stringify(chartData)}</Debug> */}
        {/* <PartyChart
          key="partyChart"
          data={chartData}
          colorScale={['#99C93E', '#4CB0D8', '#D43194', '#B1B3B4']}
          label="Fraktionen"
        /> */}
        <PartyChart width={chartWidth} />
      </Wrapper>
    );
  }
}

Fraktionen.propTypes = {
  chartData: PropTypes.shape().isRequired,
};

export default Fraktionen;
