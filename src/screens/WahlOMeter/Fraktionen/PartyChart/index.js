import React from 'react';
import Svg, { G, Text, Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

// Components
import PartyRow from './PartyRow';

const PartyChart = ({ width, chartData, onClick, selected }) => {
  return (
    <Svg
      width={width - 36}
      height={width / 305 * 270 - 36}
      viewBox="0 0 305 270"
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
          colors={['#f5a623', '#b1b3b4']}
        />
      ))}

      {/* <Rect x="0" y="0" width="1000" height="850" fill="red" /> */}
      {/* <G>
      <Rect y="0" width="305" rx="3" ry="3" height="36" fill="#ededed" />
      <Text fill="#4a4a4a" fontSize="13" x="50" y="23" textAnchor="end">
        Union
      </Text>
      <Rect x="62" y="8" width="235" rx="3" ry="3" height="20" fill="#b1b3b4" />
      <Rect x="62" y="8" width="145" rx="3" ry="3" height="20" fill="#f5a623" />
      <Text fill="#4a4a4a" fontSize="12" x="203" y="23" textAnchor="end">
        62,6%
      </Text>
    </G>
    <G>
      <Text fill="#4a4a4a" fontSize="13" x="50" y="69" textAnchor="end">
        SPD
      </Text>
      <Rect x="62" y="54" width="235" rx="3" ry="3" height="20" fill="#b1b3b4" />
      <Rect x="62" y="54" width="132" rx="3" ry="3" height="20" fill="#f5a623" />
      <Text fill="#4a4a4a" fontSize="12" x="190" y="69" textAnchor="end">
        56,1%
      </Text>
    </G>
    <G>
      <Rect y="92" width="305" rx="3" ry="3" height="36" fill="#ededed" />
      <Text fill="#4a4a4a" fontSize="13" x="50" y="115" textAnchor="end">
        Grüne
      </Text>
      <Rect x="62" y="100" width="235" rx="3" ry="3" height="20" fill="#b1b3b4" />
      <Rect x="62" y="100" width="117" rx="3" ry="3" height="20" fill="#f5a623" />
      <Text fill="#4a4a4a" fontSize="12" x="175" y="115" textAnchor="end">
        55,5%
      </Text>
    </G> */}
    </Svg>
  );
};

PartyChart.propTypes = {
  width: PropTypes.number.isRequired,
};

export default PartyChart;
