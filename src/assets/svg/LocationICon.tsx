import * as React from 'react';
import Svg, {Circle, Path, SvgProps} from 'react-native-svg';

export const LocationIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Circle cx={9} cy={9} r={9} fill="#000" fillOpacity={0.2} />
      <Path
        d="M9 3.75c-2.07 0-3.75 1.512-3.75 3.375 0 3 3.75 7.125 3.75 7.125s3.75-4.125 3.75-7.125c0-1.863-1.68-3.375-3.75-3.375zM9 9a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
        fill="#fff"
      />
    </Svg>
  );
};
