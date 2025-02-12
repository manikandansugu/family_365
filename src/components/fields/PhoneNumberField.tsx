import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {COLOR} from '../../utils/colors';
import {TextInputFieldInterface} from '../../entities/commonObjects';

const PhoneNumberField = (props: TextInputFieldInterface) => {
  const {placeholder, placeholderTextColor, onChange, value} = props ?? {};
  return (
    <View style={styles.container}>
      <Text style={styles.code}>+91</Text>
      <View style={styles.divider} />
      <TextInput
        value={value}
        onChangeText={onChange}
        style={styles.textField}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        keyboardType="number-pad"
      />
    </View>
  );
};

export default PhoneNumberField;

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderColor: COLOR.TextInputBorder,
    borderWidth: 1,
    borderRadius: 20,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: {
    paddingHorizontal: 11,
    fontSize: 13,
    flex: 0.8,
    color: COLOR.black,
  },
  divider: {
    height: 27,
    borderWidth: 0.5,
    width: 1,
    borderColor: COLOR.TextInputBorder,
  },
  code: {
    flex: 0.2,
    textAlign: 'center',
    fontSize: 13,
  },
});
