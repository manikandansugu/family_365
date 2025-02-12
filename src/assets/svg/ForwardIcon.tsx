import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ForwordIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path d="M14 5l6 6-6 6" stroke="#fff" strokeWidth={2} />
      <Path
        d="M7 5l6 6-6 6"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={2}
      />
    </Svg>
  );
};
