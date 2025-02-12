import React from 'react';
import {Text as DefaultText} from 'react-native';

const AppFontProvider = ({children}: {children: React.ReactNode}) => {
  (DefaultText as any).defaultProps = (DefaultText as any).defaultProps || {};
  (DefaultText as any).defaultProps.style = [
    {fontFamily: 'inter'},
    (DefaultText as any).defaultProps.style,
  ];

  return <>{children}</>;
};

export default AppFontProvider;
