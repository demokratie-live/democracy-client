import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

export default class ListScreen extends Component {
  renderListData = ({ item }) => {
    const { title, subtitle } = item;
    return <Row title={title} subtitle={subtitle} />;
  };

  render() {
    return (
      <List style={{ flex: 1, backgroundColor: 'red' }}>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          renderItem={({ item: { title } }) => <ListItem title={title} />}
        />
      </List>
    );
  }
}
