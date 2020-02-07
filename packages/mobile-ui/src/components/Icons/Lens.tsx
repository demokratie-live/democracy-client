import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgLens = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M644.86 718.824L950.035 1024 1024 950.035 718.824 644.86c124.148-159.547 115.633-387.328-27.48-530.442-155.331-155.33-410.4-152.102-569.714 7.212-159.314 159.313-162.542 414.383-7.212 569.713 143.114 143.114 370.895 151.63 530.442 27.481zM400.42 723c182.909 0 331.185-144.57 331.185-322.905 0-178.335-148.276-322.905-331.184-322.905-182.908 0-331.185 144.57-331.185 322.905C69.236 578.431 217.513 723 400.421 723z"
        id="lens_svg__path-1"
      />
    </Defs>
    <G
      id="lens_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="lens_svg__lens">
        <Mask id="lens_svg__mask-2" fill="#fff">
          <Use xlinkHref="#lens_svg__path-1" />
        </Mask>
        <Use
          id="lens_svg__search"
          fill={props.color}
          xlinkHref="#lens_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgLens;
