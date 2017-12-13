import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import Header from '../../components/ListDetails/Header';
import Main from './Main';
import Evaluation from './Evaluation';

import listData from '../../data/list.json';

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const Content = styled.ScrollView.attrs({
  pagingEnabled: true,
})``;

class ListDetails extends Component {
  state = {
    deviceWidth: Dimensions.get('window').width,
  };

  componentDidMount() {
    this.dimensionsListener = Dimensions.addEventListener('change', this.handleDimensionChange);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.handleDimensionChange);
  }

  handleDimensionChange = ({ window }) => {
    this.setState({ deviceWidth: window.width });
  };

  render() {
    const { id } = this.props.match.params;
    const item = listData.find(entry => entry.id === parseInt(id, 10));
    return (
      <Wrapper>
        <Header
          title={item.title}
          votes={item.votes}
          commentsCount={item.commentsCount}
          places={item.places}
        />
        <Content horizontal>
          <Main description={item.description} width={this.state.deviceWidth} />
          <Evaluation width={this.state.deviceWidth} />
        </Content>
      </Wrapper>
    );
  }
}

ListDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default ListDetails;
