import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const WaringIcon = (props: SvgProps) => {
  return (
    <Svg
      fill={'#FDD835'}
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      {...props}>
      <Path d="M40-120l440-760 440 760H40zm138-80h604L480-720 178-200zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240zm-40-120h80v-200h-80v200zm40-100z" />
    </Svg>
  );
};
