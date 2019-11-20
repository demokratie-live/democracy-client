import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgCheckmark = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M370 710l568-568 86 86-568 568-86 86L0 512l86-86 284 284z"
        id="checkmark_svg__path-1"
      />
    </Defs>
    <G
      id="checkmark_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="checkmark_svg__checkmark">
        <Mask id="checkmark_svg__mask-2" fill="#fff">
          <Use xlinkHref="#checkmark_svg__path-1" />
        </Mask>
        <Use
          id="checkmark_svg__Line-6"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#checkmark_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgCheckmark;
