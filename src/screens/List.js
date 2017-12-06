import React, { Component } from 'react';
import styled from 'styled-components/native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

console.log(listData);

const List = styled.FlatList`
  background-color: #fff;
`;

export default class ListScreen extends Component {
  renderListData = ({ item }) => {
    const { title, subtitle } = item;
    return <Row title={title} subtitle={subtitle} />;
  };

  render() {
    return <List data={listData} keyExtractor={item => item.id} renderItem={this.renderListData} />;
  }
}
