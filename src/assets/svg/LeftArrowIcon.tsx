import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const LeftArrowIcon = (props: SvgProps) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 8 14" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.507 7l5.303 5.304-1.06 1.06L.916 7.531a.75.75 0 010-1.06L6.75.636l1.06 1.06L2.507 7z"
        fill="#fff"
      />
    </Svg>
  );
};
