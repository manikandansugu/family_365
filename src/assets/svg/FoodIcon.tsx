import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const FoodIcon = (props: SvgProps) => {
  return (
    <Svg width={14} height={14} viewBox="0 0 8 10" fill="none" {...props}>
      <Path
        d="M1.5 10V5.425a2.062 2.062 0 01-1.069-.7A1.872 1.872 0 010 3.5V0h1v3.5h.5V0h1v3.5H3V0h1v3.5c0 .467-.144.875-.431 1.225-.288.35-.644.583-1.069.7V10h-1zm5 0V6H5V2.5c0-.692.244-1.281.731-1.769A2.41 2.41 0 017.5 0v10h-1z"
        fill="#E8EAED"
      />
    </Svg>
  );
};
