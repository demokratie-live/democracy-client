import * as React from "react";
import { Svg, SvgProps, Path, G } from "react-native-svg";

const SvgDownload = (props: SvgProps) => (
  <Svg width="18px" height="18px" viewBox="0 0 18 18" {...props}>
    <G fill={props.color} fillRule="nonzero" stroke="none" strokeWidth={1}>
      <Path d="M17 8a1 1 0 00-1 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V3a1 1 0 011-1h6a1 1 0 100-2H3a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3V9a1 1 0 00-1-1z" />
      <Path d="M13 2h1.58L8.29 8.28a1 1 0 000 1.42 1 1 0 001.42 0L16 3.42V5a1 1 0 002 0V1a1 1 0 00-1-1h-4a1 1 0 000 2z" />
    </G>
  </Svg>
);

export default SvgDownload;
