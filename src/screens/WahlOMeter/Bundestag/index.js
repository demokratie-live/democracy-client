import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

// Components
import PieChart from './PieChart';

const Wrapper = styled.View`
  flex: 1;
  background-color: #fff;
`;

const Bundestag = ({ chartData }) => (
  <Wrapper>
    <PieChart data={chartData} colorScale={['#EAA844', '#B1B3B4']} label="Wahl-⦻-Meter" />
  </Wrapper>
);

Bundestag.propTypes = {
  chartData: PropTypes.shape().isRequired,
};

export default Bundestag;
