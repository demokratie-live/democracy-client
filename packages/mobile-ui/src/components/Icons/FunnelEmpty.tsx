import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgFunnelEmpty = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        id="funnel-empty_svg__path-1"
        d="M402.86 722.104V414.8L72 92h880L636.61 414.8V933z"
      />
    </Defs>
    <G
      id="funnel-empty_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="funnel-empty_svg__funnel-empty">
        <Mask id="funnel-empty_svg__mask-2" fill="#fff">
          <Use xlinkHref="#funnel-empty_svg__path-1" />
        </Mask>
        <Use
          id="funnel-empty_svg__Path-3"
          stroke={props.color}
          strokeWidth={60}
          fillRule="nonzero"
          xlinkHref="#funnel-empty_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgFunnelEmpty;
