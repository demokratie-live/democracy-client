import * as React from 'react';
import { Svg, SvgProps, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgParagraph = (props: SvgProps) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024" {...props}>
    <Defs>
      <Path
        d="M781 574c0 18.822-3.265 36.676-10 53-6.325 16.696-15.352 31.862-27 46-11.4 13.506-24.843 25.6-40 36-15.573 10.334-31.706 18.973-49 26 38.805 33.672 58.01 75.138 58 124 .01 27.161-5.559 50.774-17 71-10.838 20.473-25.627 37.559-44 51-18.502 14.204-39.245 24.762-62 32-23.34 7.352-47.154 11-72 11-65.039 0-116.895-17.47-155-52-38.72-35.35-57.925-85.454-58-151h73c-1.094 19.471 1.594 37.709 8 55 5.886 17.264 14.913 32.238 27 45 11.729 12.58 26.133 22.754 43 30 16.936 8.112 35.373 11.952 55 12 16.48-.048 32.23-1.968 48-6 14.96-3.647 28.787-9.79 41-18 12.371-8.684 22.166-19.243 29-32 7.763-12.584 11.412-28.134 11-47 .412-27.976-9.383-52.549-29-73-19.563-21.016-43.955-40.405-73-58-29.341-18.497-61.223-35.967-96-53-34.365-16.754-66.247-35.568-95-56-29.633-21.035-54.025-44.84-74-72-19.205-26.593-29-58.845-29-96 0-19.67 3.265-37.524 10-54 6.325-16.544 15.352-31.71 27-46 11.4-13.354 24.843-25.449 40-36 15.573-10.182 31.706-18.821 49-26-38.805-33.52-58.01-75.37-58-125-.01-27.161 5.559-50.774 17-71 10.838-20.473 25.627-37.559 44-51 18.502-14.204 39.437-24.762 63-32 23.3-7.352 46.923-11 71-11 65.039 0 116.895 17.278 155 52 38.72 34.39 57.925 85.07 58 152h-73c1.094-20.087-1.594-38.709-8-56-5.886-17.264-14.913-32.238-27-45-11.729-12.58-26.133-22.754-43-30-16.936-8.112-35.373-11.952-55-12-16.48.048-32.23 1.968-48 6-14.96 3.647-28.787 9.79-41 18-12.371 8.684-22.166 19.243-29 32-7.763 12.584-11.412 28.134-11 47-.412 28.744 9.383 53.7 29 74 19.563 21.168 43.955 40.557 73 59 29.341 17.649 61.223 35.118 96 52 34.365 16.906 66.247 35.72 95 56 29.633 21.187 54.025 44.992 74 72 19.205 26.745 29 58.997 29 97zm-72 1c0-30.203-10.953-57.054-33-81-21.765-23.62-48.282-45.292-79-65-31.541-19.419-64.016-37.447-98-54-33.655-16.436-62.863-33.122-87-50-28.13 11.508-50.804 27.043-68 47-18.16 19.17-27 45.061-27 77 0 29.436 10.76 55.712 32 79 21.804 23.51 47.937 44.99 79 65 30.428 19.117 62.71 37.53 97 55 33.35 17.052 62.557 34.122 87 51 27.824-11.508 50.882-27.043 69-47 18.777-19.17 28-45.061 28-77z"
        id="paragraph_svg__a"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="paragraph_svg__b" fill="#fff">
        <Use xlinkHref="#paragraph_svg__a" />
      </Mask>
      <Use fill={props.color} xlinkHref="#paragraph_svg__a" />
    </G>
  </Svg>
);

export default SvgParagraph;
