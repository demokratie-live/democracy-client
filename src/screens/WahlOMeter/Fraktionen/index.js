import React, { Component } from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';

// Components
import PartyChart from './PartyChart';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
`;

const VoteResultNumbers = styled.View`
  width: ${() => Dimensions.get('window').width - 18 * 2};
  max-width: 464;
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

class Fraktionen extends Component {
  state = {
    chartWidth: Math.min(Dimensions.get('window').width, Dimensions.get('window').height),
    selected: 0,
  };
  onLayout = () => {
    const chartWidth = Math.min(Dimensions.get('window').width, Dimensions.get('window').height);
    if (this.state.chartWidth !== chartWidth) {
      this.setState({
        chartWidth,
      });
    }
  };

  onClick = index => () => {
    this.setState({ selected: index });
  };

  render() {
    const { chartData } = this.props;
    const { chartWidth, selected } = this.state;
    return (
      <Wrapper onLayout={this.onLayout}>
        <PartyChart
          width={chartWidth}
          chartData={chartData}
          onClick={this.onClick}
          selected={selected}
        />
        <VoteResultNumbers>
          <VoteResult>
            <VoteResultCircleNumber>
              <VoteResultCircle color="#f5a623" />
              <VoteResultNumber>{chartData[selected].values[0].value}</VoteResultNumber>
            </VoteResultCircleNumber>
            <VoteResultLabel>Übereinstimmungen</VoteResultLabel>
          </VoteResult>
          <VoteResult>
            <VoteResultCircleNumber>
              <VoteResultCircle color="#b1b3b4" />
              <VoteResultNumber>{chartData[selected].values[1].value}</VoteResultNumber>
            </VoteResultCircleNumber>
            <VoteResultLabel>Differenzen</VoteResultLabel>
          </VoteResult>
        </VoteResultNumbers>
      </Wrapper>
    );
  }
}

Fraktionen.propTypes = {
  chartData: PropTypes.shape().isRequired,
};

export default Fraktionen;
