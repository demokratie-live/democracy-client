import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

class ListScreen extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };
  renderListData = ({ item }) => itemProps => <Row {...item} {...itemProps} />;

  render() {
    const { navigator } = this.props;
    return (
      <List style={{ flex: 1, backgroundColor: 'red' }}>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          renderItem={props => (
            <ListItem
              onPress={() =>
                navigator.push({
                  screen: 'democracy.BundestagDetailsTabScreen',
                  title: 'Abstimmung',
                })
              }
              component={this.renderListData(props)}
            />
          )}
        />
      </List>
    );
  }
}

export default ListScreen;
