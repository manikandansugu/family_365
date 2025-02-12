import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const ClockIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={9} fill="#000" fillOpacity={0.2} />
      <Circle cx={9} cy={9} r={5.5} stroke="#fff" />
      <Path
        d="M9 9.6V5.8M9 9.6L7 11"
        stroke="#fff"
        strokeWidth={0.8}
        strokeLinecap="round"
      />
    </Svg>
  );
};
