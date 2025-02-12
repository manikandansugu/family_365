import {StyleSheet, StyleSheetProperties, Text, View} from 'react-native';
import React, {ReactNode} from 'react';
import LinearGradient from 'react-native-linear-gradient';

const GradiantProvider = ({
  children,
  colors,
  style,
}: {
  children: ReactNode;
  colors: string[];
  style: any;
}) => {
  return (
    <LinearGradient
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradiantProvider;
