import React from 'react';
import PropTypes from 'prop-types';

import Svg, { Path } from 'svgs';
import * as shape from 'd3-shape';

const Slice = (props) => {
  const {
    value, fill, innerRadius = 0, outerRadius,
  } = props;
  const arc = shape
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  return <Path d={arc(value)} fill={fill} />;
};

Slice.propTypes = {
  value: PropTypes.shape({
    data: PropTypes.shape({
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    }),
  }).isRequired,
  fill: PropTypes.string.isRequired,
  innerRadius: PropTypes.string.isRequired,
  outerRadius: PropTypes.string.isRequired,
};

export default Slice;
