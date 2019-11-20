import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgArrow = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M507.453 233.121l.064-.072L1024 692.776l-87.9 98.752-427.816-380.804L88.876 791.577 0 693.703 507.342 233l.11.121z"
        id="arrow_svg__path-1"
      />
    </Defs>
    <G
      id="arrow_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="arrow_svg__arrow">
        <Mask id="arrow_svg__mask-2" fill="#fff">
          <Use xlinkHref="#arrow_svg__path-1" />
        </Mask>
        <Use
          id="arrow_svg__Line"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#arrow_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgArrow;
