import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

export const ProfileDonationHistoryIcon = (props: SvgProps) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 16 15" fill="none" {...props}>
      <Path
        d="M11.278 7.5a3.474 3.474 0 003.472-3.473A3.474 3.474 0 0011.278.555a3.473 3.473 0 00-3.472 3.472 3.473 3.473 0 003.472 3.472zm3.785 3.888a1.357 1.357 0 00-1.007-.417H9.195l-1.445-.507.23-.652 1.215.465h1.944a.818.818 0 00.597-.257.782.782 0 00.236-.57c0-.374-.18-.631-.541-.777L6.382 6.805H5.028v6.25l4.861 1.389 5.576-2.084a1.322 1.322 0 00-.402-.972zM3.639 6.805H.85v7.639H3.64v-7.64z"
        fill="#fff"
      />
    </Svg>
  );
};
