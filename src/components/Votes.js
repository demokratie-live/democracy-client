import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  height: 65;
  width: 60;
  align-items: center;
`;

const VotesIcon = styled(Icon).attrs({
  name: 'ios-arrow-up',
  type: 'ionicon',
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
