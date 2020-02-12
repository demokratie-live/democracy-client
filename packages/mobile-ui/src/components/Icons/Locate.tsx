import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgLocate = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M40.014 513.848l384.023 85.272c.23.12.64.53.57.12l85.48 384.754c7.34 33.075 22.211 40.006 33.371 40.006h.01c14.48 0 26.4-11.712 35.36-34.795L895.911 173.74c7.34-18.882 3.44-30.834-1.14-37.505-8.47-12.392-25.21-15.782-44.6-8.271L34.784 445.088C4.644 456.809-.726 471.812.074 482.303c.79 10.522 8.38 24.514 39.94 31.545zm6.815-39.675l815.602-317.185c2.69-1.04 4.711-1.52 6.312-1.73-.21 1.48-.7 3.57-1.77 6.292L549.8 977.17c-1.79 4.621-3.431 7.903-4.791 10.183-1-2.46-2.131-5.932-3.201-10.773l-85.502-384.828c-2.521-11.404-12.664-21.537-24.057-24.068l-384.8-85.508c-4.83-1.06-8.322-2.2-10.802-3.201 2.3-1.35 5.571-3.011 10.182-4.802z"
        id="locate_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="locate_svg__b" fill="#fff">
        <Use xlinkHref="#locate_svg__a" />
      </Mask>
      <Use fill={props.color} fillRule="nonzero" xlinkHref="#locate_svg__a" />
    </G>
  </Svg>
);

export default SvgLocate;
