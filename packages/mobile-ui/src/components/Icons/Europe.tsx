import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgEurope = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M507 100l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zm-26 788l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zm289-683l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zm0 552l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zM219 205l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zM61 494l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zm866 0l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61zM219 757l18-58 19 58h60l-48 37 18 57-49-35-48 35 18-57-49-37h61z"
        id="europe_svg__path-1"
      />
    </Defs>
    <G
      id="europe_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="europe_svg__europe">
        <Mask id="europe_svg__mask-2" fill="#fff">
          <Use xlinkHref="#europe_svg__path-1" />
        </Mask>
        <Use
          id="europe_svg__Path-6"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#europe_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgEurope;
