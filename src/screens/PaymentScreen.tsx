import {Text} from 'react-native';
import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import {COLOR} from '../utils/colors';
import {useAuthState} from '../context/AuthContext';

const PaymentScreen = ({route}: any) => {
  const {user} = route.params;
  const {setUser} = useAuthState() ?? {};

  useEffect(() => {
    setTimeout(() => {
      setUser(user);
    }, 2000);
  }, []);

  return (
    <ImageBackgroundProvider
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
      <LottieView
        source={require('../assets/lottie/Animation - 1734444190666.json')}
        autoPlay
        loop
        resizeMode="contain"
        style={{height: 180, width: 180}}
      />
      <Text style={{fontSize: 20, color: COLOR.white, fontWeight: 600}}>
        Payment successful
      </Text>
      <Text style={{fontSize: 16, color: COLOR.white}}>
        Thank you for joining Family 365!{' '}
      </Text>
    </ImageBackgroundProvider>
  );
};

export default PaymentScreen;
