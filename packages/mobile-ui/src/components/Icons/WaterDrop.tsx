import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgWaterDrop = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M512 1024c215.04 0 390-174.876 390-390 0-209.165-304.888-582.447-318-598-18.852-23.314-44.464-36-72-36s-53.148 12.686-72 36c-13.1 15.564-318 388.835-318 598 0 215.124 174.96 390 390 390zM468 59c11.809-14.986 27.506-23 44-23s32.191 8.014 44 23c3.239 3.329 310 378.731 310 575 0 195.297-158.814 354-354 354S158 829.297 158 634c0-196.269 306.738-571.671 310-575zm62 793c106.278-8.803 191.212-93.706 200-200 .754-9.86-7.42-18-17-18-10.462 0-18.511 8.14-20 18-8.03 86.262-76.73 154.976-163 163-9.86 1.496-18 9.522-18 20 0 9.588 8.117 17.774 18 17z"
        id="water-drop_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="water-drop_svg__b" fill="#fff">
        <Use xlinkHref="#water-drop_svg__a" />
      </Mask>
      <Use
        fill={props.color}
        fillRule="nonzero"
        xlinkHref="#water-drop_svg__a"
      />
    </G>
  </Svg>
);

export default SvgWaterDrop;
