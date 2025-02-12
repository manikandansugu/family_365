import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileLocationIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 17 17" fill="none" {...props}>
      <Path
        d="M8.5 1.207c-2.875 0-5.208 2.1-5.208 4.688 0 4.166 5.208 9.895 5.208 9.895s5.209-5.729 5.209-9.895c0-2.588-2.333-4.688-5.209-4.688zm0 7.292a2.083 2.083 0 110-4.167 2.083 2.083 0 010 4.167z"
        fill="#fff"
      />
    </Svg>
  );
};
