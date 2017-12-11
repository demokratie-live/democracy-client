import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'react-native-elements';
import styled from 'styled-components/native';

import Row from '../components/List/Row';

import listData from '../data/list.json';

const ListWrapper = styled(List).attrs({
  containerStyle: {
    marginTop: 0,
  },
})`
  flex: 1;
`;

const FlatList = styled.FlatList`
  background-color: yellow;
`;

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
      <ListWrapper>
        <FlatList
          data={listData}
          keyExtractor={item => item.id}
          renderItem={props => (
            <ListItem onPress={this.pushToDetailScreen} component={this.renderListData(props)} />
          )}
        />
      </ListWrapper>
    );
  }
}

export default ListScreen;
