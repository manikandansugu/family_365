import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ICustomButton} from '../../entities/commonObjects';

const CustomButtonField = ({
  style,
  onPress,
  textColor,
  buttonText,
  opacity,
  textStyle,
}: ICustomButton) => {
  return (
    <TouchableOpacity style={style} onPress={onPress} activeOpacity={opacity}>
      <Text style={[{color: textColor, textAlign: 'center'}, textStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtonField;
