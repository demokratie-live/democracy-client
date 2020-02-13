import * as React from 'react';
import { Svg, SvgProps, Defs, Path, Use } from 'react-native-svg';

const SvgCheckmark = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M370 710l568-568 86 86-568 568-86 86L0 512l86-86 284 284z"
        id="checkmark_svg__a"
      />
    </Defs>
    <Use fill={props.color} fillRule="nonzero" xlinkHref="#checkmark_svg__a" />
  </Svg>
);

export default SvgCheckmark;
