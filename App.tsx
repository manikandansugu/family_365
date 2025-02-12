import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/navigations/RootNavigator';
import AppFontProvider from './src/components/providers/FontProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthContextProvider from './src/context/AuthContext';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {ToasterProvider} from './src/components/providers/ToasterProvider';
import {Platform, UIManager} from 'react-native';

function App(): React.JSX.Element {
  // UIManager
  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // LayoutAnimations.easeIn();
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <AppFontProvider>
          <Provider store={store}>
            <ToasterProvider>
              <AuthContextProvider>
                <SafeAreaProvider>
                  <RootNavigator />
                </SafeAreaProvider>
              </AuthContextProvider>
            </ToasterProvider>
          </Provider>
        </AppFontProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
