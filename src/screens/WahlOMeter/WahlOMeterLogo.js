import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const CIRCLE_SIZE = 210;

const Wrapper = styled.View`
  width: ${CIRCLE_SIZE};
  height: ${CIRCLE_SIZE};
  border-radius: ${CIRCLE_SIZE / 2};
  border-width: 2;
  border-style: solid;
  border-color: #979797;
  justify-content: center;
  align-items: center;
`;

const Headline = styled.Text`
  font-size: 27;
  color: #000;
`;

const Subline = styled.Text`
  font-size: 15;
  color: #db9522;
`;

const WahlOMeterLogo = ({ subline }) => (
  <Wrapper>
    <Headline>Wahl-O-Meter</Headline>
    {subline && <Subline>{subline}</Subline>}
  </Wrapper>
);

WahlOMeterLogo.propTypes = {
  subline: PropTypes.string.isRequired,
};

export default WahlOMeterLogo;
