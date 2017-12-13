import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Row from '../components/List/Row';

import listData from '../data/list.json';

const List = styled.ul``;

const RowWrapper = styled.li``;

export default class ListScreen extends Component {
  static propTypes = {
    history: PropTypes.func.isRequired,
  };

  pushToDetailScreen = item => () => {
    const { history } = this.props;

    history.push(`/details/${item.id}`);
  };

  renderListData = () =>
    listData.map((item) => {
      const { id } = item;
      return (
        <RowWrapper key={id}>
          <Row onPress={this.pushToDetailScreen(item)} {...item} />
        </RowWrapper>
      );
    });

  render() {
    return <List>{this.renderListData()}</List>;
  }
}
