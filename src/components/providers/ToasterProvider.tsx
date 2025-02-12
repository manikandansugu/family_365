import React, {createContext, useContext, useState} from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {CloseIcon, ErrorIcon, SuccessIcon, WaringIcon} from '../../assets/svg';
import {Toast, ToasterContextProps} from '../../entities/commonObjects';

const ToasterContext = createContext<ToasterContextProps | undefined>(
  undefined,
);

export const ToasterProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [toast, setToast] = useState<Toast | null>(null);
  const [slideAnim] = useState(new Animated.Value(0));
  const [fadeAnim] = useState(new Animated.Value(0));

  const getToastColor = (status?: 'error' | 'success' | 'warning') => {
    switch (status) {
      case 'error':
        return '#fff';
      case 'success':
        return '#fff';
      case 'warning':
        return '#fff';
      default:
        return '#333';
    }
  };

  const getToasterIcon = (status?: 'error' | 'success' | 'warning') => {
    switch (status) {
      case 'error':
        return <ErrorIcon />;
      case 'success':
        return <SuccessIcon />;
      case 'warning':
        return <WaringIcon />;
      default:
        return '#333';
    }
  };

  const showToast = ({
    message,
    duration = 3000,
    status,
    slideFrom = 'right',
  }: Toast) => {
    setToast({message, duration, status, slideFrom});

    // Set initial slide position
    slideAnim.setValue(slideFrom === 'right' ? 300 : -300);

    // Animate slide-in and fade-in
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Automatically hide toast after the specified duration
    const timeout = setTimeout(() => hideToast(), duration);

    return () => clearTimeout(timeout);
  };

  const hideToast = () => {
    // Animate slide-out and fade-out
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: toast?.slideFrom === 'right' ? 300 : -300,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setToast(null));
  };

  return (
    <ToasterContext.Provider value={{showToast}}>
      {children}
      {toast && (
        <Animated.View
          style={[
            styles.toastContainer,
            {
              transform: [{translateX: slideAnim}],
              opacity: fadeAnim,
              backgroundColor: getToastColor(toast.status),
              zIndex: 9999,
            },
          ]}>
          <Pressable style={{marginRight: 20}}>
            {getToasterIcon(toast.status)}
          </Pressable>
          <Text style={styles.toastText}>{toast.message}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={hideToast}>
            <CloseIcon />
          </TouchableOpacity>
        </Animated.View>
      )}
    </ToasterContext.Provider>
  );
};

export const useToaster = (error?: Toast): ToasterContextProps => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 70,
    left: 20,
    right: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  toastText: {
    color: '#000',
    fontSize: 16,
    flex: 1,
    marginRight: 10,
    fontWeight: '500',
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 15,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
