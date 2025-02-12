import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileDOwnloadIcon = (props: SvgProps) => {
  return (
    <Svg width={19} height={19} viewBox="0 0 15 11" fill="none" {...props}>
      <Path
        d="M2.592.143A2.232 2.232 0 00.36 2.375v.446h14.283v-.446A2.232 2.232 0 0012.411.143H2.592zM.36 8.625V3.714h14.283v4.91a2.232 2.232 0 01-2.232 2.233H2.593A2.232 2.232 0 01.36 8.625m9.67-1.637a.446.446 0 100 .893h2.083a.446.446 0 100-.893H10.03z"
        fill="#fff"
      />
    </Svg>
  );
};
