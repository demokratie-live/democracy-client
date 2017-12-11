import React, { Component } from 'react';
import styled from 'styled-components/native';

import Votes from '../../components/Votes';
import Menu from '../../components/ListDetails/HeaderMenu';

const Wrapper = styled.View`
  height: 120;
  border-bottom-width: 1;
`;

const HeaderMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  padding-top: 20;
  padding-left: 10;
  flex: 1;
  font-size: 20;
`;

export default class ListDetailsHeader extends Component {
  render() {
    return (
      <Wrapper>
        <HeaderMain>
          <Title>
            der Titelder Titelder Titelder Titelder Titelder Titelder Titelder Titelder Titelder
            Titelder Titelder Titelder Titel
          </Title>
          <Votes />
        </HeaderMain>
        <Menu />
      </Wrapper>
    );
  }
}
