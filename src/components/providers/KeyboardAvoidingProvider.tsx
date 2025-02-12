import React, {ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface KeyboardAvoidingProviderProps {
  children: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const KeyboardAvoidingProvider: React.FC<KeyboardAvoidingProviderProps> = ({
  children,
  containerStyle,
}) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        {
          flexGrow: 1,
          justifyContent: 'space-between',
          paddingBottom: 20,
        },
        containerStyle,
      ]}
      extraScrollHeight={130}
      keyboardShouldPersistTaps="handled"
      enableOnAndroid
      enableAutomaticScroll={Platform.OS === 'ios'}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardAvoidingProvider;
