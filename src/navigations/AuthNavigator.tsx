import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from '../screens/StartScreen';
import RegisterComponent from '../screens/RegisterComponent';
import OrphanageDetailsScreen from '../screens/OrphanageDetailsScreen';
import IdentityVerificationScreen from '../screens/IdentityVerificationScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PaymentScreen from '../screens/PaymentScreen';
import Screen from '../screens/screen';
import PaymentVerificationScreen from '../screens/PaymentVerificationScreen';
import PaymentSummaryScreen from '../screens/PaymentSummaryScreen';

type RootStackParamList = {
  register: undefined;
  startScreen: undefined;
  orphanageDetailsScreen: undefined;
  identityVerificationScreen: {
    user: any;
  };
  welcomeScreen: undefined;
  paymentScreen: undefined;
  paymentVerificationScreen: undefined;
  screen: undefined;
  paymentSummaryScreen: {amount: number; paymentDetails: any; dataNew: any};
};

const AuthNavigator = () => {
  const Stack = createStackNavigator<RootStackParamList>();
  // initial render
  return (
    <Stack.Navigator initialRouteName="welcomeScreen">
      <Stack.Screen
        name="startScreen"
        options={{headerShown: false}}
        component={StartScreen}
      />
      <Stack.Screen
        name="paymentScreen"
        options={{headerShown: false}}
        component={PaymentScreen}
      />
      <Stack.Screen
        name="register"
        options={{headerShown: false}}
        component={RegisterComponent}
      />
      <Stack.Screen
        name="orphanageDetailsScreen"
        options={{headerShown: false}}
        component={OrphanageDetailsScreen}
      />
      <Stack.Screen
        name="identityVerificationScreen"
        options={{headerShown: false}}
        component={IdentityVerificationScreen}
      />
      <Stack.Screen
        name="welcomeScreen"
        options={{headerShown: false}}
        component={WelcomeScreen}
      />
      <Stack.Screen
        name="paymentVerificationScreen"
        options={{headerShown: false}}
        component={PaymentVerificationScreen}
      />
      <Stack.Screen
        name="screen"
        options={{headerShown: false}}
        component={Screen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="paymentSummaryScreen"
        component={PaymentSummaryScreen}
      />
    </Stack.Navigator>
  );
};

// export
export default AuthNavigator;
