import * as React from 'react';
import { Svg, SvgProps, Defs, Path, Use } from 'react-native-svg';

const SvgMobile = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M267 77c0-42.635 34.651-77 77-77h336c42.36 0 77 34.363 77 77v870c0 42.635-34.651 77-77 77H344c-42.36 0-77-34.363-77-77V77zm45 57h401v757H312V134zm201 863c24.077 0 44-19.923 44-44 0-25.077-19.923-45-44-45-25.077 0-45 19.923-45 45 0 24.077 19.923 44 45 44z"
        id="mobile_svg__a"
      />
    </Defs>
    <Use fill={props.color} xlinkHref="#mobile_svg__a" fillRule="evenodd" />
  </Svg>
);

export default SvgMobile;
