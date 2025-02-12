import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileIssueIcon = (props: SvgProps) => {
  return (
    <Svg width={22} height={22} viewBox="0 0 15 15" fill="none" {...props}>
      <Path
        d="M8.195 5.416h-1.39v-1.39h1.39m0 6.945h-1.39V6.805h1.39M7.5.555a6.944 6.944 0 100 13.889 6.944 6.944 0 000-13.89z"
        fill="#fff"
      />
    </Svg>
  );
};
