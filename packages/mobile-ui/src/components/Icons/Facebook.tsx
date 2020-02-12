import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgFacebook = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M592.663 1024H375.51V511.935H267v-176.44h108.51V229.566C375.51 85.635 436.748 0 610.842 0h144.902v176.505H665.18c-67.774 0-72.252 24.656-72.252 70.673l-.299 88.317h164.11l-19.208 176.44H592.63V1024h.033z"
        id="facebook_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="facebook_svg__b" fill="#fff">
        <Use xlinkHref="#facebook_svg__a" />
      </Mask>
      <Use fill={props.color} xlinkHref="#facebook_svg__a" />
    </G>
  </Svg>
);

export default SvgFacebook;
