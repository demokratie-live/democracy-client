import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  width: ${props => props.width || undefined};
`;

const Evaluation = props => <Wrapper width={props.width} />;

Evaluation.propTypes = {
  width: PropTypes.number,
};

Evaluation.defaultProps = {
  width: undefined,
};

export default Evaluation;
