import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgCheckmark = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M370 710l568-568 86 86-568 568-86 86L0 512l86-86 284 284z"
        id="checkmark_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="checkmark_svg__b" fill="#fff">
        <Use xlinkHref="#checkmark_svg__a" />
      </Mask>
      <Use
        fill={props.color}
        fillRule="nonzero"
        xlinkHref="#checkmark_svg__a"
      />
    </G>
  </Svg>
);

export default SvgCheckmark;
