import * as React from 'react';
import {
  Svg,
  SvgProps,
  Defs,
  Path,
  G,
  Mask,
  Use,
  Circle,
} from 'react-native-svg';

const SvgFunnel = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        id="funnel_svg__path-1"
        d="M394.426 738.055v-330.69L38 60h948L646.238 407.364V965z"
      />
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
          stroke={props.color}
          strokeWidth={30}
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#funnel_svg__path-1"
        />
      </G>
      <Circle cx="864" cy="160" r="160" fill="#d0021b" />
    </G>
  </Svg>
);

export default SvgFunnel;
