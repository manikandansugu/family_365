import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const DropDownArrow = (props: SvgProps) => {
  return (
    <Svg width={12} height={12} viewBox="0 0 8 7" fill="none" {...props}>
      <Path d="M7.835.958H.165L4 6.042 7.835.958z" fill="#000" />
    </Svg>
  );
};
