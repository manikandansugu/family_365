import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

export const EditIcon = (props: SvgProps) => {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <G clipPath="url(#clip0_525_1997)">
        <Path
          d="M9.871 1.653a2.457 2.457 0 113.475 3.476l-.73.73-3.475-3.475.73-.73zM8.478 3.046L2.49 9.033c-.35.351-.6.79-.724 1.27l-.815 3.174a.469.469 0 00.572.57l3.173-.815c.48-.123.919-.373 1.27-.723l5.986-5.987-3.475-3.476z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_525_1997">
          <Path fill="#fff" d="M0 0H15V15H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
