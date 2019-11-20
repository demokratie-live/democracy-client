import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgSort = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M103.567 603.872v-490.12h105.026v490.12h106.484L157.538 918.949 0 603.872h103.567zm360.296-80.228V418.618h420.103v105.026H463.863zm0-313.618V105H1024v105.026H463.863zm0 628.452V733.452h245.06v105.026h-245.06z"
        id="sort_svg__path-1"
      />
    </Defs>
    <G
      id="sort_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="sort_svg__sort">
        <Mask id="sort_svg__mask-2" fill="#fff">
          <Use xlinkHref="#sort_svg__path-1" />
        </Mask>
        <Use
          id="sort_svg__Line-3"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#sort_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgSort;
