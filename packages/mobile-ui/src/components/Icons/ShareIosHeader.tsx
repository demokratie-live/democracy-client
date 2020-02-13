import * as React from 'react';
import { Svg, SvgProps, G, Path } from 'react-native-svg';

const SvgShareIosHeader = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <G stroke={props.color} strokeWidth={50} fill="none" fillRule="evenodd">
      <Path d="M397.164 306H145v695.741h732.396V306H624.635M512 609.603V36.968M391.915 149.879L512 34.812l116.388 115.067" />
    </G>
  </Svg>
);

export default SvgShareIosHeader;
