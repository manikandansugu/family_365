import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const FlagIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={9} fill="#000" fillOpacity={0.2} />
      <Path d="M5.5 13.5V5H10l.2 1H13v5H9.5l-.2-1H6.5v3.5h-1z" fill="#fff" />
    </Svg>
  );
};
