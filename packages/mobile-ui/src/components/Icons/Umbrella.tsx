import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgUmbrella = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M512 0c-10.025 0-18.16 8.124-18 18v120C140.668 146.75 43.797 418.35 19 536c-4.583 19.35-.293 37.872 12 52 11.907 15.694 30.928 24.432 52 24h411v298c-.16 42.81-35.211 77.785-78 78-43.402-.215-78.442-35.18-78-78v-41c-.442-10.308-8.589-18.42-19-18-9.647-.42-17.794 7.692-18 18v41c.217 62.789 51.585 114 115 114 62.825 0 114.17-51.211 114-114V612h411c21.082.432 40.102-8.318 52-24 12.303-14.15 16.582-32.65 12-52-24.81-117.65-121.68-389.238-475-398V18c.17-9.876-7.966-18-18-18zm457 544c2.536 10.086-1.056 17.292-4 21-5.884 7.164-14.61 11-24 11H82c-9.386 0-18.123-3.836-24-11-2.94-3.708-6.543-10.914-4-21 23.564-111.767 115.961-371 458-371 341.02 0 433.429 259.233 457 371z"
        id="umbrella_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="umbrella_svg__b" fill="#fff">
        <Use xlinkHref="#umbrella_svg__a" />
      </Mask>
      <Use fill={props.color} fillRule="nonzero" xlinkHref="#umbrella_svg__a" />
    </G>
  </Svg>
);

export default SvgUmbrella;
