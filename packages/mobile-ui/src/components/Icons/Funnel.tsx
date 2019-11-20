import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgFunnel = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path id="funnel_svg__path-1" d="M385 756V399L0 24h1024L657 399v602z" />
    </Defs>
    <G
      id="funnel_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="funnel_svg__funnel">
        <Mask id="funnel_svg__mask-2" fill="#fff">
          <Use xlinkHref="#funnel_svg__path-1" />
        </Mask>
        <Use
          id="funnel_svg__Path-3"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#funnel_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgFunnel;
