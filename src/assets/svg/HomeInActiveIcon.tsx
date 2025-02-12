import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const HomeInActiveIcon = (props: SvgProps) => {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5 11.81c0-1.358 0-2.037.274-2.634.275-.597.79-1.038 1.821-1.922l1-.857C9.96 4.8 10.89 4 12 4c1.11 0 2.041.799 3.905 2.396l1 .857c1.03.884 1.546 1.325 1.82 1.922.275.597.275 1.276.275 2.634v4.241c0 1.886 0 2.828-.586 3.414-.586.586-1.528.586-3.414.586H9c-1.886 0-2.828 0-3.414-.586C5 18.878 5 17.936 5 16.05v-4.24z"
        stroke="#fff"
        strokeWidth={1.5}
      />
      <Path
        d="M14.5 20.05v-5a1 1 0 00-1-1h-3a1 1 0 00-1 1v5"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
