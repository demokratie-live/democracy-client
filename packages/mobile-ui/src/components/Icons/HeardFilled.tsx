import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgHeardFilled = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M776 74c-68.04 0-136.375 26.06-188 72-44.881 39.36-73.143 106.32-75 110-.123 1.29-.567 2.41-1 3-.511-.805-1.08-2.208-2-4-.855-2.68-29.106-69.64-74-109-51.623-45.94-119.935-72-188-72-105.969 0-200.154 71.557-234 178-59.917 188.5 74.886 420.286 361 620 38.265 27.16 105.95 68.808 109 71 7.59 4.374 17.602 7 28 7 10.377 0 20.39-2.626 28-7 3.04-2.18 70.703-43.84 109-71 286.093-199.714 420.919-431.5 361-620C976.166 145.557 881.982 74 776 74z"
        id="heard-filled_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="heard-filled_svg__b" fill="#fff">
        <Use xlinkHref="#heard-filled_svg__a" />
      </Mask>
      <Use
        fill={props.color}
        fillRule="nonzero"
        xlinkHref="#heard-filled_svg__a"
      />
    </G>
  </Svg>
);

export default SvgHeardFilled;
