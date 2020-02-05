import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgLock = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M326 466h372V326.286c0-51.423-18.164-95.326-54.492-131.71C607.18 158.192 563.344 140 512 140c-51.344 0-95.18 18.192-131.508 54.576S326 274.863 326 326.286V466zm605 69.273v418.909c0 19.394-6.79 35.879-20.368 49.454-13.579 13.576-30.067 20.364-49.465 20.364H162.833c-19.398 0-35.886-6.788-49.465-20.364C99.79 990.061 93 973.576 93 954.182v-418.91c0-19.393 6.79-35.878 20.368-49.454 13.579-13.576 30.067-20.363 49.465-20.363h23.278V325.818c0-89.212 32.007-165.818 96.02-229.818C346.147 32 422.77 0 512 0s165.854 32 229.868 96c64.014 64 96.02 140.606 96.02 229.818v139.637h23.279c19.398 0 35.886 6.787 49.465 20.363S931 515.878 931 535.273z"
        id="lock_svg__path-1"
      />
    </Defs>
    <G
      id="lock_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="lock_svg__lock">
        <Mask id="lock_svg__mask-2" fill="#fff">
          <Use xlinkHref="#lock_svg__path-1" />
        </Mask>
        <Use
          id="lock_svg__Mask"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#lock_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgLock;
