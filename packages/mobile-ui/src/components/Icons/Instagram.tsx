import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgInstagram = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M874 0H150C67.297 0 0 67.297 0 150v724c0 82.703 67.297 150 150 150h724c82.703 0 150-67.297 150-150V150c0-82.703-67.297-150-150-150zM514 780c-148.883 0-270-121.117-270-270 0-148.883 121.117-270 270-270 148.883 0 270 121.117 270 270 0 148.883-121.117 270-270 270zm300-480c-49.625 0-90-40.375-90-90s40.375-90 90-90 90 40.375 90 90-40.375 90-90 90z"
        id="instagram_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="instagram_svg__b" fill="#fff">
        <Use xlinkHref="#instagram_svg__a" />
      </Mask>
      <Use
        fill={props.color}
        fillRule="nonzero"
        xlinkHref="#instagram_svg__a"
      />
      <Path
        d="M514 300c-115.781 0-210 94.219-210 210s94.219 210 210 210 210-94.219 210-210-94.219-210-210-210z"
        fill={props.color}
        fillRule="nonzero"
        mask="url(#instagram_svg__b)"
      />
    </G>
  </Svg>
);

export default SvgInstagram;
