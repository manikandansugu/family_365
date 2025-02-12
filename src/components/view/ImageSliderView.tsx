import * as React from 'react';
import {View, Image} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const ImageSlider = ({
  imageContainerStyle,
  imageStyle,
  containerWidth,
  containerHeight,
  data,
}: {
  imageContainerStyle: any;
  imageStyle: any;
  containerWidth: number;
  containerHeight: number;
  data: any[]; // Accepts array of image sources
}) => {
  return (
    <View style={{flex: 1}}>
      <Carousel
        loop
        width={containerWidth}
        height={containerHeight}
        autoPlay={true}
        data={data}
        scrollAnimationDuration={1000}
        renderItem={({index}) => (
          <View style={[imageContainerStyle, {width: containerWidth}]}>
            <Image
              source={data[index]}
              style={[imageStyle, {height: containerHeight}]}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ImageSlider;
