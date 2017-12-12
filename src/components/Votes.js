import React, { Component } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  height: 65;
  width: 60;
  align-items: center;
`;

const VotesIcon = styled(Ionicons).attrs({
  name: 'ios-arrow-up',
  size: 40,
  color: 'grey',
  marginBottom: -10,
})``;

const Number = styled.Text``;

export default class Votes extends Component {
  render() {
    return (
      <Wrapper>
        <VotesIcon />
        <Number>91874</Number>
      </Wrapper>
    );
  }
}
