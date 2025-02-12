import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const HeadPhoneIcon = (props: SvgProps) => {
  return (
    <Svg width={12} height={14} viewBox="0 0 12 14" fill="none" {...props}>
      <Path
        d="M11.833 6.417a5.833 5.833 0 10-11.666 0v3.007c0 .96.828 1.66 1.75 1.66h1.75V6.417H1.333a4.667 4.667 0 019.334 0H8.333v4.667h1.13a1.167 1.167 0 01-1.13.875h-.912a1.02 1.02 0 00-.838-.438H5.417a1.02 1.02 0 100 2.042h1.166c.347 0 .654-.173.838-.437h.912a2.334 2.334 0 002.325-2.135c.665-.22 1.175-.813 1.175-1.567V6.417z"
        fill="#000"
      />
    </Svg>
  );
};
