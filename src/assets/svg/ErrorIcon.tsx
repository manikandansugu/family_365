import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ErrorIcon = (props: SvgProps) => {
  return (
    <Svg
      fill={'#E53935'}
      height="28px"
      viewBox="0 -960 960 960"
      width="28px"
      {...props}>
      <Path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280zm-40-160h80v-240h-80v240zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93zm0-320z" />
    </Svg>
  );
};
