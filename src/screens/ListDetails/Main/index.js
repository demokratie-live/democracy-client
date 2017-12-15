import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

import Content from '../../../components/ListDetails/Content';
import VotePannel from '../../../components/ListDetails/VotePannel';

const Wrapper = styled.View`
  flex: 1;
  width: ${props => props.width || undefined};
`;

const Main = props => (
  <Wrapper width={props.width}>
    <Content {...props} />
    <VotePannel />
  </Wrapper>
);

Main.propTypes = {
  width: PropTypes.number,
};

Main.defaultProps = {
  width: undefined,
};

export default Main;
