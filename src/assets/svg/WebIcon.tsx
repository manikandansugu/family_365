import * as React from 'react';
import Svg, { Circle, Path, SvgProps } from 'react-native-svg';

export const WebIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 18 18" fill="none" {...props}>
      {/* Background circle similar to GroupIcon */}
      <Circle cx={9} cy={9} r={9} fill="#000" fillOpacity={0.2} />
      {/* White inner globe (circle) */}
      <Path
        d="M9 4a5 5 0 100 10 5 5 0 000-10z"
        fill="#fff"
      />
      {/* White horizontal line representing the equator */}
      <Path
        d="M4 9h10"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
