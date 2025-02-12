import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const DropUpIcon = (props: SvgProps) => {
  return (
    <Svg
      height="30px"
      viewBox="0 -960 960 960"
      width="30px"
      fill="#000"
      {...props}>
      <Path d="M280-400l200-200 200 200H280z" />
    </Svg>
  );
};
