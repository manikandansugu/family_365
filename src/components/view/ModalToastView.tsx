import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// Interface for the Toast message props
interface ToasterProps {
  message: string;
  visible: boolean;
  duration: number;
  status: 'error' | 'success' | 'info'; // Define possible status types
  slideFrom: 'left' | 'right'; // Define direction of slide
}

const {width} = Dimensions.get('window');

// Toaster component that will slide in/out based on provided props
const Toaster: React.FC<ToasterProps> = ({
  message,
  visible,
  duration,
  status,
  slideFrom,
}) => {
  const translateX = useSharedValue(slideFrom === 'right' ? width : -width); // Start off-screen based on direction

  useEffect(() => {
    if (visible) {
      // Slide in from the specified direction
      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.out(Easing.quad),
      });

      // Slide out after the duration
      setTimeout(() => {
        translateX.value = withTiming(slideFrom === 'right' ? width : -width, {
          duration: 300,
          easing: Easing.in(Easing.quad),
        });
      }, duration);
    }
  }, [visible, translateX, duration, slideFrom]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const backgroundColor =
    status === 'error'
      ? '#ff4d4d'
      : status === 'success'
      ? '#4caf50'
      : '#2196f3';

  return (
    <Animated.View style={[styles.container, {backgroundColor}, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

// ModalToast component to manage toast state
export const ModalToast: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    visible: boolean;
    duration: number;
    status: 'error' | 'success' | 'info';
    slideFrom: 'left' | 'right';
  }>({
    message: '',
    visible: false,
    duration: 3000,
    status: 'info',
    slideFrom: 'right',
  });

  const showToast = (
    message: string,
    status: 'error' | 'success' | 'info',
    duration = 3000,
    slideFrom: 'left' | 'right' = 'right',
  ) => {
    setToast({
      message,
      visible: true,
      duration,
      status,
      slideFrom,
    });

    setTimeout(() => {
      setToast(prev => ({...prev, visible: false}));
    }, duration + 300); // Adding duration for the slide-out effect
  };

  return (
    <>
      <Toaster
        message={toast.message}
        visible={toast.visible}
        duration={toast.duration}
        status={toast.status}
        slideFrom={toast.slideFrom}
      />
      {/* Example usage of showToast */}
      {/* Call this function from any other component to trigger the toast */}
      <View>
        <Text onPress={() => showToast('This is a success message', 'success')}>
          Show Success Toast
        </Text>
        <Text onPress={() => showToast('This is an error message', 'error')}>
          Show Error Toast
        </Text>
      </View>
    </>
  );
};
