import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLOR} from '../../utils/colors';

const ButtonFieldComponent = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={onPress}>
      <Text style={styles.btnText}>Continue</Text>
    </TouchableOpacity>
  );
};

export default ButtonFieldComponent;

const styles = StyleSheet.create({
  btnContainer: {
    height: 47,
    width: 132,
    borderRadius: 50,
    backgroundColor: COLOR.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
});
