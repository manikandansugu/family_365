import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CloseIcon = (props: SvgProps) => {
  return (
    <Svg height="20px" viewBox="0 -960 960 960" width="20px" {...props}>
      <Path d="M256-200l-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224z" />
    </Svg>
  );
};
