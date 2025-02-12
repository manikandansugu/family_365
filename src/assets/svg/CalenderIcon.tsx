import * as React from 'react';
import Svg, {Path, Rect, SvgProps} from 'react-native-svg';

export const CalenderIcon = (props: SvgProps) => {
  return (
    <Svg width={15} height={15} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M3.5 1.5v1.2h-.8c-.658 0-1.2.542-1.2 1.2v5.6c0 .658.542 1.2 1.2 1.2h6.4c.658 0 1.2-.542 1.2-1.2V3.9c0-.658-.542-1.2-1.2-1.2h-.8V1.5h-.8v1.2H4.3V1.5h-.8zm-.8 2h6.4c.229 0 .4.171.4.4v5.6a.39.39 0 01-.4.4H2.7a.39.39 0 01-.4-.4V3.9c0-.229.171-.4.4-.4z"
        fill="#292929"
      />
      <Rect x={4} y={5} width={4} height={0.75} rx={0.375} fill="#292929" />
    </Svg>
  );
};
