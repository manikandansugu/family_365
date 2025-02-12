import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileSponserIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 16 8" fill="none" {...props}>
      <Path
        d="M13.75 4.194c.417 0 .764.139.972.417.278.277.417.625.417.972L9.583 7.666l-4.86-1.389V.027h1.319l5.07 1.875c.346.14.555.417.555.764 0 .209-.07.417-.209.556a.88.88 0 01-.625.278H8.89l-1.18-.487-.209.625 1.389.556h4.861zM.556.027h2.777v7.64H.556V.026z"
        fill="#fff"
      />
    </Svg>
  );
};
