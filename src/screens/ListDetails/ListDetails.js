import React, { Component } from 'react';
import styled from 'styled-components/native';

import Header from '../../components/ListDetails/Header';

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

export default class ListDetailsScreen extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
      </Wrapper>
    );
  }
}
