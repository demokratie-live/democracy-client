import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Header from '../../components/ListDetails/Header';
import Content from '../../components/ListDetails/Content';
import VotePannel from '../../components/ListDetails/VotePannel';

import listData from '../../data/list.json';

const Wrapper = styled.View`
  flex: 1;
  background-color: white;
`;

const ListDetails = ({ match }) => {
  const { id } = match.params;
  const item = listData.find(entry => entry.id === parseInt(id, 10));
  return (
    <Wrapper>
      <Header
        title={item.title}
        votes={item.votes}
        commentsCount={item.commentsCount}
        places={item.places}
      />
      <Content description={item.description} />
      <VotePannel />
    </Wrapper>
  );
};

ListDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
};

export default ListDetails;
