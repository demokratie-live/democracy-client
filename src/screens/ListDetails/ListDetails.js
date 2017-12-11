import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import styled from 'styled-components/native';

import Header from '../../components/ListDetails/Header';

import detailsData from '../../data/details.json';

const Wrapper = styled.View``;

export default class ListDetailsScreen extends Component {
  render() {
    return (
      <Wrapper>
        <Header />
      </Wrapper>
    );
  }
}
