import React from 'react';
import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import {LoaderProps} from '../../entities/commonObjects';
import {COLOR} from '../../utils/colors';
import {theme} from '../../utils/theme';

const Loader: React.FC<LoaderProps> = ({
  isVisible,
  size = 'large',
  color = theme.white,
  message,
}) => {
  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <ActivityIndicator size={size} color={color} />
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: 9999, // Ensure it stays on top of other components
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'transparent', // Loader box background
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
});

export default Loader;
