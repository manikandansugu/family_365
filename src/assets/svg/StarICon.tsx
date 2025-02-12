import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const StartIcon = (props: SvgProps) => {
  return (
    <Svg width={11} height={10} viewBox="0 0 11 10" fill="none" {...props}>
      <Path
        d="M5.5 0l1.235 3.8h3.996L7.498 6.15l1.235 3.8L5.5 7.6 2.267 9.95l1.235-3.8L.269 3.8h3.996L5.5 0z"
        fill="#fff"
      />
    </Svg>
  );
};
