import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

export const CalenderTabIcon = (props: SvgProps) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M7 3v2.4H5.4A2.413 2.413 0 003 7.8V19c0 1.316 1.084 2.4 2.4 2.4h12.8c1.316 0 2.4-1.084 2.4-2.4V7.8c0-1.316-1.084-2.4-2.4-2.4h-1.6V3H15v2.4H8.6V3H7zM5.4 7h12.8c.457 0 .8.343.8.8V19c0 .457-.343.8-.8.8H5.4a.781.781 0 01-.8-.8V7.8c0-.457.343-.8.8-.8z"
        fill="#fff"
      />
      <Rect x={8} y={10} width={8} height={1.5} rx={0.75} fill="#fff" />
    </Svg>
  );
};
