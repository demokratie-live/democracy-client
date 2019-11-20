import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgHouse = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M991 379L575 55c-16.886-13.675-39.311-21-63-21-23.711 0-46.103 7.325-63 21L33 379c-18.812 15.15-33 44.277-33 68v44c0 28.547 22.892 51.538 51 52h71c8.549-.462 15.193 6.211 15 14v305c.193 70.386 57.56 128 128 128h494c70.44 0 127.807-57.614 128-128V557c-.193-7.789 6.451-14.462 15-14h71c28.108-.462 51-23.464 51-52v-44c0-23.723-14.188-52.85-33-68zM620 954H404V741c0-60.286 48.447-109 108-109s108 48.714 108 109v213zm368-463c0 7.991-6.648 14.674-15 15h-71c-28.364-.326-51.267 22.647-51 51v304c-.267 50.715-41.382 92-92 92H656V740c.381-80.13-64.388-145.142-144-145-79.635-.142-144.404 64.859-144 145v213H265c-50.607-.011-91.745-41.285-92-92V557c.255-28.376-22.647-51.337-51-51H51c-8.352-.337-15-7.02-15-15v-44c0-12.952 9.05-31.527 19-39L471 83c10.63-8.293 25.53-13 41-13 15.47 0 30.37 4.707 41 13l416 325c9.928 7.473 19 26.048 19 39v44z"
        id="house_svg__path-1"
      />
    </Defs>
    <G
      id="house_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="house_svg__house">
        <Mask id="house_svg__mask-2" fill="#fff">
          <Use xlinkHref="#house_svg__path-1" />
        </Mask>
        <Use
          id="house_svg__135"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#house_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgHouse;
