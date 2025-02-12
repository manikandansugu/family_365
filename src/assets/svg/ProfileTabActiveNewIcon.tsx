import * as React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export const ProfileTabActiveNewIcon = (props: SvgProps) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 13.5c2.485 0 4.5-2.015 4.5-4.5S14.485 4.5 12 4.5 7.5 6.515 7.5 9s2.015 4.5 4.5 4.5z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.5 18.6C4.5 15.885 6.885 13.5 9.6 13.5h4.8c2.715 0 5.1 2.385 5.1 5.1v.3c0 .165-.135.3-.3.3H4.8a.3.3 0 01-.3-.3v-.3z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
