import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const CancelIcon = (props: SvgProps) => {
  return (
    <Svg width={32} height={32} viewBox="0 0 28 28" fill="none" {...props}>
      <Path
        d="M14 .188C6.384.188.187 6.383.187 14S6.385 27.813 14 27.813c7.616 0 13.813-6.197 13.813-13.813C27.813 6.384 21.616.187 14 .187zm5.753 18.062l-1.503 1.503-4.25-4.25-4.25 4.25-1.503-1.503 4.25-4.25-4.25-4.25L9.75 8.247l4.25 4.25 4.25-4.25 1.503 1.503-4.25 4.25 4.25 4.25z"
        fill="#000"
      />
    </Svg>
  );
};
