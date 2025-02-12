import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../utils/colors';
import { TextInputFieldInterface } from '../../entities/commonObjects';
import { EyeCloseIcon, EyeOpenIcon, UploadIcon } from '../../assets/svg';

const TextInputComponent = (props: TextInputFieldInterface) => {
  const {
    placeholder,
    placeholderTextColor,
    backgroundColor,
    height,
    radius,
    textColor,
    onChange,
    value,
    type = 'name',
    inputName,
    onUploadClick,
    editable = true, // ✅ Default is editable
  } = props ?? {};

  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const _uploadButton = () => {
    return (
      <View style={styles.uploadButton}>
        <UploadIcon />
        <Text style={styles.uploadText}>Upload</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <TextInput
        style={[
          { backgroundColor: editable ? backgroundColor : '#f0f0f0' }, // 🔹 Light gray if disabled
          { height: height, borderRadius: radius, color: editable ? textColor : '#a0a0a0' }, // 🔹 Gray text if disabled
          { paddingRight: type === 'upload' ? 100 : null },
          styles.textField,
          !editable && styles.disabledField, // 🔹 Reduced opacity if disabled
        ]}
        value={value}
        onChangeText={editable ? onChange : undefined} // Prevent typing if disabled
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={type === 'password' && isPasswordVisible}
        keyboardType={type === 'number' ? 'number-pad' : 'default'}
        editable={editable} // ✅ Now supports editable
      />

      {type === 'password' && editable && (
        <Pressable
          style={{ position: 'absolute', right: 20, top: 13 }}
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          {isPasswordVisible ? <EyeCloseIcon /> : <EyeOpenIcon />}
        </Pressable>
      )}

      {type === 'upload' && (
        <Pressable
          style={styles.uploadBtnMain}
          onPress={() => editable && onUploadClick && onUploadClick(inputName)}>
          {_uploadButton()}
        </Pressable>
      )}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  textField: {
    borderWidth: 1,
    borderColor: COLOR.TextInputBorder,
    paddingHorizontal: 14,
    fontSize: 13,
  },
  disabledField: {
    opacity: 1, // 🔹 Makes it visually disabled
  },
  uploadBtnMain: {
    position: 'absolute',
    top: 10,
    right: 10,
    flex: 1,
  },
  uploadButton: {
    height: 30,
    width: 80,
    borderColor: 'rgba(113, 113, 113, 1)',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  uploadText: {
    fontSize: 13,
    color: COLOR.black,
    fontWeight: '500',
  },
});
