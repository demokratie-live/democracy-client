import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

export default class ListScreen extends Component {
  renderListData = ({ item }) => () => <Row {...item} />;

  render() {
    return (
      <List style={{ flex: 1, backgroundColor: 'red' }}>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          renderItem={props => <ListItem component={this.renderListData(props)} />}
        />
      </List>
    );
  }
}
