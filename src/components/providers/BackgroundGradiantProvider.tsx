import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {ImageBackgroundProviderInterface} from '../../entities/commonObjects';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const ImageBackgroundProvider = ({
  children,
  style,
}: ImageBackgroundProviderInterface) => {
  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={[style, styles.container]}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});

export default ImageBackgroundProvider;
