import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, SvgProps} from 'react-native-svg';

export const UploadIcon = (props: SvgProps) => {
  return (
    <Svg width={14} height={14} viewBox="0 0 10 10" fill="none" {...props}>
      <G clipPath="url(#clip0_729_2082)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.362 3.65a.469.469 0 01-.662 0L5.469 2.42V7.03a.469.469 0 01-.938 0V2.42L3.3 3.651a.469.469 0 01-.662-.663L4.668.957 5 .625l.331.331 2.031 2.032a.469.469 0 010 .663zm-5.8 2.444a.469.469 0 00-.937 0v2.031a1.25 1.25 0 001.25 1.25h6.25a1.25 1.25 0 001.25-1.25V6.094a.469.469 0 00-.938 0v2.031a.312.312 0 01-.312.313h-6.25a.312.312 0 01-.313-.313V6.094z"
          fill="#292929"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_729_2082">
          <Path fill="#fff" d="M0 0H10V10H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
