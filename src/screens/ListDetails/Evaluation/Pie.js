import React, { Component } from 'react';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop,
} from 'svgs';
import styled from 'styled-components/native';
import * as shape from 'd3-shape';

const arcs = shape.pie()([1, 4, 2]);
const arcGenerator = shape
  .arc()
  .innerRadius(0)
  .outerRadius(100)
  .startAngle(d => d.startAngle)
  .endAngle(d => d.endAngle);
console.log(arcGenerator(arcs[1]));

const PieSvg = styled(Svg)`
  flex:1
  align-self: stretch
`;

export default class SvgExample extends Component {
  renderPie = () =>
    arcs.map((arc) => {
      console.log(arc);
      return <Path d={arcGenerator(arc)} stroke="black" />;
    });

  render() {
    return <PieSvg viewBox="0 0 1000 1000">{this.renderPie()}</PieSvg>;
  }
}
