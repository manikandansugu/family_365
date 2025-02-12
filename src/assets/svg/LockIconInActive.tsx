import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const LockIconInActive = (props: SvgProps) => {
  return (
    <Svg width={10} height={12} viewBox="0 0 10 12" fill="none" {...props}>
      <Path
        d="M7.917 4.25V3.082A2.888 2.888 0 005 .166a2.888 2.888 0 00-2.917 2.917v1.166c-.991 0-1.75.759-1.75 1.75v4.084c0 .991.759 1.75 1.75 1.75h5.834c.991 0 1.75-.759 1.75-1.75V5.999c0-.991-.759-1.75-1.75-1.75zM3.25 3.082c0-.992.758-1.75 1.75-1.75s1.75.758 1.75 1.75v1.166h-3.5V3.083z"
        fill="#fff"
      />
    </Svg>
  );
};
