import React, { Component } from 'react';
import Svg, { G } from 'svgs';
import styled from 'styled-components/native';
import * as shape from 'd3-shape';

import Slice from './Slice';

const arcs = shape
  .pie()
  .padAngle(0.02)
  .startAngle(-90 * (Math.PI / 180))
  .endAngle(90 * (Math.PI / 180))
  .value(d => d.value)([
    { id: 1, value: 2, color: 'blue' },
    { id: 2, value: 1, color: 'green' },
    { id: 3, value: 3, color: 'red' },
  ]);

const Wrapper = styled.View`
  flex:1
  align-items: center
  justify-content: center
`;

const PieSvg = styled(Svg)`
  flex:1
  align-self: stretch
`;

export default class SvgExample extends Component {
  renderPie = () =>
    arcs.map(arc => (
      <Slice
        key={arc.data.id}
        outerRadius="500"
        innerRadius="100"
        value={arc}
        fill={arc.data.color}
      />
    ));

  render() {
    return (
      <Wrapper>
        <PieSvg style={{ flex: 1, alignSelf: 'stretch' }} viewBox="0 0 1000 1000">
          <G transform="translate(500, 500)">{this.renderPie()}</G>
        </PieSvg>
      </Wrapper>
    );
  }
}
