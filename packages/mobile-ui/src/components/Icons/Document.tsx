import * as React from 'react';
import { Svg, Defs, Path, G, Mask, Use } from 'react-native-svg';

const SvgDocument = (props: React.SVGProps<SVGSVGElement>) => (
  <Svg width="1em" height="1em" viewBox="0 0 1024 1024">
    <Defs>
      <Path
        d="M325.272 375c-9.94 0-18.022-7.603-18.022-17 0-9.376 8.081-17 18.022-17h237.29c9.952 0 18.022 7.624 18.022 17 0 9.397-8.07 17-18.022 17h-237.29zm0 171c-9.807 0-18.022-7.611-18.022-17 0-9.378 8.215-17 18.022-17H733.77c9.808 0 18.022 7.622 18.022 17 0 9.389-8.214 17-18.022 17H325.272zm0 205c-9.807 0-18.022-7.6-18.022-17s8.215-17 18.022-17H733.77c9.808 0 18.022 7.6 18.022 17s-8.214 17-18.022 17H325.272zm-93.113 273H791.84C863.54 1024 922 966.633 922 896V287c0-16.778-9.115-38.384-21.026-50L680.706 21c-12.08-12.046-34.127-21-51.063-21H232.16C160.46 0 102 57.367 102 128v768c0 70.633 58.473 128 130.159 128zM670.694 62l188.23 185H707.738c-20.282 0-37.034-16.467-37.045-37V62zm-531.649 66c0-50.862 41.886-92 93.114-92H629.643c.971 0 2.305.182 4.005 0v174c-.31 40.309 33.044 73.07 74.09 73h177.217c-.174 1.435 0 2.733 0 4v609c0 50.862-41.874 92-93.114 92H232.16c-51.205 0-93.102-41.127-93.114-92V128z"
        id="document_svg__path-1"
      />
    </Defs>
    <G
      id="document_svg__document"
      stroke="none"
      strokeWidth={1}
      fill="none"
      fillRule="evenodd">
      <Mask id="document_svg__mask-2" fill="#fff">
        <Use xlinkHref="#document_svg__path-1" />
      </Mask>
      <Use
        id="document_svg__Shape"
        fill={props.color}
        fillRule="nonzero"
        xlinkHref="#document_svg__path-1"
      />
    </G>
  </Svg>
);

export { SvgDocument };
