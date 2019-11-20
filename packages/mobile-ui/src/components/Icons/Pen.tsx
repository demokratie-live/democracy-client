import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgPen = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M190 877l119-55c24.952-11.553 56.69-38.144 72-61l405-577c36.879-52.823 24-125.892-29-163-52.68-36.883-125.756-23.985-163 29l15 10-15-10-404 577c-15.98 22.682-30.123 61.59-32 89l-12 131c-.905 12.201 3.525 22.822 12 29 5.1 3.315 10.68 5 17 5 4.555.011 14.884-3.574 15-4zM623 70c25.864-36.05 76.217-44.984 113-19 36.062 25.15 44.943 75.646 19 112l-75 108-132-93 75-108zm-96 138l132 93-267 381-132-93 267-381zM194 719c1.348-21.02 13.4-54.072 25-71l21-29 132 92-20 29c-12.282 17.284-39.313 39.868-58 49l-111 51 11-121zm666 269c9.893 0 18 8.048 18 18 0 9.941-8.107 18-18 18H182c-9.893 0-18-8.059-18-18 0-9.952 8.107-18 18-18h678z"
        id="pen_svg__path-1"
      />
    </Defs>
    <G
      id="pen_svg__Symbols"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <G id="pen_svg__pen">
        <Mask id="pen_svg__mask-2" fill="#fff">
          <Use xlinkHref="#pen_svg__path-1" />
        </Mask>
        <Use
          id="pen_svg__Shape"
          fill={props.color}
          fillRule="nonzero"
          xlinkHref="#pen_svg__path-1"
        />
      </G>
    </G>
  </Svg>
);

export default SvgPen;
