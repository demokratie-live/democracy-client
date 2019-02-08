import React from 'react';
import Svg, { Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

// Components
import PartyRow from './PartyRow';

const PartyChart = ({ width, chartData, onClick, selected, colors, showPercentage }) => {
  return (
    <Svg
      width={width - 2 * 18}
      height={chartData.length * 46}
      viewBox={`0 0 305 ${chartData.length * 46}`}
      style={{ flex: 1 }}
    >
      <Rect y={selected * 46} width="305" rx="3" ry="3" height="36" fill="#ededed" />
      {chartData.map(({ party, values }, i) => (
        <PartyRow
          key={party}
          party={party}
          values={values}
          index={i}
          onClick={onClick}
          colors={colors}
          showPercentage={showPercentage}
        />
      ))}
    </Svg>
  );
};

PartyChart.propTypes = {
  width: PropTypes.number.isRequired,
  colors: PropTypes.arrayOf(PropTypes.string),
  showPercentage: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
  chartData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

PartyChart.defaultProps = {
  colors: ['#b1b3b4', '#f5a623'],
  showPercentage: false,
};

export default PartyChart;
