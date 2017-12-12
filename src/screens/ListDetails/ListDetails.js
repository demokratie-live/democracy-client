import React, { Component } from 'react';
import styled from 'styled-components/native';

import Header from '../../components/ListDetails/Header';
import Content from '../../components/ListDetails/Content';
import VotePannel from '../../components/ListDetails/VotePannel';

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

export default class ListDetailsScreen extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
        <Content />
        <VotePannel />
      </Wrapper>
    );
  }
}
