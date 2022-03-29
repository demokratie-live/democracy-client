import * as React from 'react';
import { Svg, SvgProps, Defs, Path, Use } from 'react-native-svg';

const SvgBellHeader = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M510.395 1016.127c-80.754 0-147.257-47.26-147.257-128.014 0-40.267 74.348-18.095 147.257-18.204 73.308-.11 146.769-22.283 146.769 18.204 0 80.754-66.014 128.014-146.769 128.014zM510.247 974c59.05 0 107.32-30.705 107.32-83.172 0-26.305-53.715-11.9-107.32-11.828-53.314.072-107.68-14.334-107.68 11.828 0 52.467 48.63 83.172 107.68 83.172zM98 836h828C813.052 712.562 756.578 541.396 756.578 322.5c0-20.984-5.095-42.586-15.286-64.805-10.19-22.218-24.84-43.409-43.947-63.57-19.108-20.161-44.903-36.723-77.387-49.684C587.475 131.481 551.49 125 512 125c-39.49 0-75.475 6.48-107.958 19.441-32.484 12.961-58.279 29.523-77.387 49.684-19.107 20.161-33.757 41.352-43.947 63.57-10.191 22.22-15.286 43.82-15.286 64.805 0 218.896-56.474 390.063-169.422 513.5zM484.763 74.58c-9.515-7.425-15.633-19-15.633-32.005C469.13 20.165 487.296 2 509.705 2c22.409 0 40.575 18.166 40.575 40.575 0 12.382-5.547 23.47-14.292 30.912 7.7.735 16.217 1.922 26.358 3.656C634.814 87.81 693.361 118 737.986 167.714c44.625 49.715 66.937 103.524 66.937 161.429 0 52.952 3.719 102.476 11.156 148.571 7.438 46.096 16.973 85.334 28.606 117.715 11.633 32.38 146.859 282.285 127.026 282.285H109.23c-19.834 0-36.997-7.238-51.49-21.714-14.494-14.476 109.94-228.19 121.574-260.571 11.633-32.381 21.168-71.62 28.606-117.715 7.437-46.095 11.156-95.619 11.156-148.571 0-57.905 22.312-111.714 66.937-161.429C330.64 118 389.186 87.81 461.654 77.143c8.728-.975 16.282-1.846 23.11-2.562z"
        id="bell-header_svg__a"
      />
    </Defs>
    <Use fill={props.color} fillRule="nonzero" xlinkHref="#bell-header_svg__a" />
  </Svg>
);

export default SvgBellHeader;
