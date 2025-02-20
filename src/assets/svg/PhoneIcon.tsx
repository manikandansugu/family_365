import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const PhoneIcon = (props: SvgProps) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" {...props}>
    <Circle cx={12} cy={12} r={12} fill="#000" fillOpacity={0.2} />
    <Path
      d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21
         11.72 11.72 0 003.64 1.16 1 1 0 011 1v3.45a1 1 0 01-1 1
         A17.92 17.92 0 012 4a1 1 0 011-1h3.45a1 1 0 011 .95
         11.72 11.72 0 001.16 3.64 1 1 0 01-.21 1.11l-2.2 2.2z"
      fill="#fff"
    />
  </Svg>
);
