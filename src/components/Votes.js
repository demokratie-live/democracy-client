import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-items: center;
  width: 48;
`;

const VotesIcon = styled(Ionicons).attrs({
  name: 'ios-arrow-up',
  color: 'grey',
})`
  margin-top: -10;
  margin-bottom: -15;
  font-size: 45;
`;

const Number = styled.Text`
  font-size: 18;
  letter-spacing: -0.29;
  color: #8f8e94;
`;

export default class Votes extends Component {
  render() {
    const { votes } = this.props;
    return (
      <Wrapper>
        <VotesIcon />
        <Number adjustsFontSizeToFit>{votes}</Number>
      </Wrapper>
    );
  }
}
