import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgX = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M508.5 413.5L911 11l113 113-402.5 402.5L995 900l-113 113-373.5-373.5L142 1006 29 893l366.5-366.5L0 131 113 18l395.5 395.5z"
        id="x_svg__path-1"
      />
    </Defs>
    <G
      id="x_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="x_svg__x">
        <Mask id="x_svg__mask-2" fill="#fff">
          <Use xlinkHref="#x_svg__path-1" />
        </Mask>
        <Use
          id="x_svg__Line-6"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#x_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgX;
