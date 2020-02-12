import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgCamera = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M987 297c-23.587-13.935-53.647-11.122-85 8l-152 92v-23c-.375-71.127-57.742-129-128-129H128c-70.633.011-128 57.884-128 129v277c0 71.104 57.367 129 128 129h494c70.247 0 127.614-57.896 128-129v-23l152 92c18.45 11.314 36.2 16.802 53 17 11.27-.198 22.26-3.011 32-9 23.927-13.233 37-40.711 37-77V374c0-36.3-13.073-63.79-37-77zM713 652c0 50.502-41.086 92-92 92H128c-50.891 0-92-41.486-92-92V375c0-51.502 41.098-93 92-93h493c50.902 0 92 41.498 92 93v277zm275-1c0 22.1-6.72 38.703-18 45-12.144 7.082-29.734 4.385-49-7L750 585V440l171-104c19.266-11.371 36.845-14.09 49-7 11.28 6.3 18 22.903 18 45v277z"
        id="camera_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="camera_svg__b" fill="#fff">
        <Use xlinkHref="#camera_svg__a" />
      </Mask>
      <Use fill={props.color} fillRule="nonzero" xlinkHref="#camera_svg__a" />
    </G>
  </Svg>
);

export default SvgCamera;
