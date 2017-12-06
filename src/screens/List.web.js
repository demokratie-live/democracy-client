import React, { Component } from 'react';
import styled from 'styled-components';

import Row from '../components/List/Row';

import listData from '../data/list.json';

const List = styled.ul``;

const RowWrapper = styled.li``;

export default class ListScreen extends Component {
  renderListData = () =>
    listData.map((item) => {
      const { title, subtitle } = item;
      return (
        <RowWrapper>
          <Row title={title} subtitle={subtitle} />
        </RowWrapper>
      );
    });

  render() {
    return <List>{this.renderListData()}</List>;
  }
}
