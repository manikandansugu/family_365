import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { COLOR } from '../../utils/colors';
import { DropDownArrow, DropUpIcon } from '../../assets/svg';
import { TextInputFieldInterface } from '../../entities/commonObjects';

interface TextFieldDropdownProps extends TextInputFieldInterface {
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  width?: number | string;
}

const TextFieldDropdown: React.FC<TextFieldDropdownProps> = (props) => {
  const {
    placeholder,
    dropDownValues,
    setHoveredIndex,
    hoveredIndex,
    value,
    borderColor = COLOR.TextInputBorder,
    borderWidth = 1,
    borderRadius = 20,
    width = 300,
  } = props ?? {};

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isDropDownOpen ? Math.min(350, dropDownValues?.length * 50) : 0, // 🔹 Adjusts dynamically
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isDropDownOpen]);

  const handleOptionSelect = (index: number) => {
    dropDownValues && setHoveredIndex && setHoveredIndex(dropDownValues[index]);
    setIsDropDownOpen(false);
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { borderColor, borderWidth, borderRadius, width },
        ]}>
        <Pressable
          style={styles.textInputs}
          onPress={() => setIsDropDownOpen(!isDropDownOpen)}>
          <Text style={styles.textStyle}>{value ? value : placeholder}</Text>
        </Pressable>
        {isDropDownOpen ? (
          <Pressable
            style={styles.iconContainer}
            onPress={() => setIsDropDownOpen(!isDropDownOpen)}>
            <DropUpIcon />
          </Pressable>
        ) : (
          <Pressable
            style={styles.iconContainer}
            onPress={() => setIsDropDownOpen(!isDropDownOpen)}>
            <DropDownArrow />
          </Pressable>
        )}
      </View>
      {isDropDownOpen && (
        <Animated.View style={[styles.dropDown, { height: animatedHeight }]}>
          {dropDownValues?.map((gen, index: number) => (
            <Pressable
              key={index}
              style={[
                styles.dropDownOption,
                hoveredIndex === index && styles.hoveredOption,
              ]}
              onPressIn={() => handleOptionSelect(index)}>
              <Text style={styles.dropDownOptionText}>{gen}</Text>
            </Pressable>
          ))}
        </Animated.View>
      )}
    </>
  );
};

export default TextFieldDropdown;

const styles = StyleSheet.create({
  container: {
    height: 50, // 🔹 Increased height for better visibility
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 11,
    position: 'relative',
  },
  textInputs: {
    fontSize: 13,
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropDown: {
    width: '100%',
    position: 'relative',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: COLOR.white, // 🔹 Background added
    elevation: 3, // 🔹 Shadow effect for dropdown
  },
  dropDownOption: {
    paddingVertical: 10, // 🔹 Increased padding
    paddingHorizontal: 20,
    width: '100%',
  },
  dropDownOptionText: {
    textTransform: 'capitalize',
    textAlign: 'left',
    fontWeight: '600',
  },
  hoveredOption: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Hover effect
  },
  textStyle: {
    color: COLOR.black,
  },
});
