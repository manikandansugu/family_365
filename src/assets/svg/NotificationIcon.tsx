import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const NotificationIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 15 15" fill="none" {...props}>
      <Path
        d="M3 6a4.5 4.5 0 013.022-4.252 1.5 1.5 0 112.963 0A4.5 4.5 0 0112 6.001v4.5l2.25 1.5v.75H.75V12L3 10.5V6zm6 7.5a1.5 1.5 0 11-3 0h3z"
        fill="#fff"
      />
    </Svg>
  );
};
