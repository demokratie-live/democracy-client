import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

// Components
import PartyRow from './PartyRow';

const PartyChart = ({ width, chartData, onClick, selected }) => {
  return (
    <Svg
      width={width - 36}
      height={chartData.length * 46}
      viewBox={`0 0 305 ${chartData.length * 46}`}
      style={{ marginVertical: 18, marginHorizontal: 18 }}
    >
      <Rect y={selected * 46} width="305" rx="3" ry="3" height="36" fill="#ededed" />
      {chartData.map(({ party, values }, i) => (
        <PartyRow
          key={party}
          party={party}
          values={values}
          index={i}
          onClick={onClick}
          colors={['#b1b3b4', '#f5a623']}
        />
      ))}
    </Svg>
  );
};

PartyChart.propTypes = {
  width: PropTypes.number.isRequired,
};

export default PartyChart;
