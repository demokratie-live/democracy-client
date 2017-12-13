import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

import Votes from '../../components/Votes';
import Menu from '../../components/ListDetails/HeaderMenu';

const Wrapper = styled.View`
  padding-top: 27;
  padding-left: 27;
  padding-bottom: 5;
  border-bottom-width: 1;
  border-bottom-color: #c8c7cc;
`;

const HeaderMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 5;
`;

const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  flex: 1;
  font-size: 17;
  color: #030303;
  letter-spacing: -0.41;
`;

const Header = ({
  title, votes, commentsCount, places,
}) => (
  <Wrapper>
    <HeaderMain>
      <Title>{title}</Title>
      <Votes votes={votes} />
    </HeaderMain>
    <Menu commentsCount={commentsCount} places={places} />
  </Wrapper>
);

Header.defaultProps = {
  title: '',
  votes: 0,
  commentsCount: 0,
  places: 0,
};

Header.propTypes = {
  title: PropTypes.string,
  votes: PropTypes.number,
  commentsCount: PropTypes.number,
  places: PropTypes.number,
};

export default Header;
