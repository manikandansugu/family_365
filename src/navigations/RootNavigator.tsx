import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {useAuthState} from '../context/AuthContext';
import React from 'react';

type RootStackParamList = {
  authNavigator: undefined;
  mainNavigator: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const {user} = useAuthState() ?? {};
  const isAuth = user?.mobileNumber;
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };
  return (
    <>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuth ? (
          <Stack.Screen
            name={'authNavigator'}
            component={AuthNavigator}
            options={{headerShown: false}}
          />
        ) : (
          <Stack.Screen name={'mainNavigator'} component={MainNavigator} />
        )}
      </Stack.Navigator>
      {/* <LoaderView show={reducer_notificationReadLoader} wrapWithSafeArea /> */}
    </>
  );
};

export default RootNavigator;
