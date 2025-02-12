import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const RightArrowIcon = (props: SvgProps) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 5 8" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.607 4L.661 6.947l.589.589 3.24-3.241a.417.417 0 000-.59L1.25.466l-.59.589L3.608 4z"
        fill="#717171"
      />
    </Svg>
  );
};
