import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AvatarViewComponent = ({imageData, avatarContainer, imageStyle}: any) => {
  return (
    <View style={avatarContainer ? avatarContainer : styles.avatarContainer}>
      <Image
        src={
          imageData
            ? imageData
            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Jf7L1uLyKL81OhzN2fk-x0OSKXABNLEZYg&s'
        }
        style={imageStyle ? imageStyle : styles.imageStyle}
      />
    </View>
  );
};

export default AvatarViewComponent;

const styles = StyleSheet.create({
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  imageStyle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    resizeMode: 'cover',
  },
});
