import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import { FlatList } from 'react-native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

class ListScreen extends Component {
  static propTypes = {
    navigator: PropTypes.shape({
      push: PropTypes.func,
    }),
  };

  static defaultProps = {
    navigator: {
      push: null,
    },
  };

  pushToDetailScreen = () => {
    const { navigator } = this.props;

    navigator.push({
      screen: 'democracy.BundestagDetailsTabScreen',
      title: 'Abstimmung',
    });
  };

  renderListData = ({ item }) => itemProps => <Row {...item} {...itemProps} />;

  render() {
    return (
      <List style={{ flex: 1, backgroundColor: 'red' }}>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          renderItem={props => (
            <ListItem onPress={this.pushToDetailScreen} component={this.renderListData(props)} />
          )}
        />
      </List>
    );
  }
}

export default ListScreen;
