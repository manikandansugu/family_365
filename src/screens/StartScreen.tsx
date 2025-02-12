import {Image, Keyboard, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import ContainerProvider from '../components/providers/ContainerProvider';
import TabViewComponent from '../components/view/TabViewComponent';
import TextInputComponent from '../components/fields/TextInputComponent';
import {theme} from '../utils/theme';
import ParticipantComponent from '../components/view/ParticipantComponent';
import ButtonFieldComponent from '../components/fields/ButtonFieldComponent';
import {COLOR} from '../utils/colors';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {AuthText, participation} from '../entities/entryObjects';
// import API_INSTANCE from '../config/apiClient';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useAuthState} from '../context/AuthContext';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {
  orphanageDetails,
  resetState,
  setGlobalPinCode,
} from '../redux/slices/dataSlice';
import API_INSTANCE from '../config/apiClient';
import {useToaster} from '../components/providers/ToasterProvider';
import {handleErrorValidate} from '../utils/helpers';

const StartScreen = () => {
  const {showToast} = useToaster();
  const dispatch = useDispatch<AppDispatch>();

  const [selectedTabText, setSelectedTabText] = useState<string>(
    AuthText.signup,
  );
  const [selectedParticipation, setSelectedRadioText] = useState<string>();

  const [areaPincode, setAreaPincode] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState(false);
  const {setUser} = useAuthState() ?? {};
  const [userError, setUserError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation<any>();

  const handleRadioSelect = (text: any) => {
    setSelectedRadioText(text);
  };
  const handleUserNameChange = (value) => {
    // Remove non-digit characters
    const numericValue = value.replace(/\D/g, '');

    // Enforce max 10 digits
    // if (numericValue.length <= 10) {
      setUserName(numericValue);
    // }

    // Real-time validation: Show error if length is not exactly 10
    if (numericValue.length > 10) {
      setUserError('Mobile number must be exactly 10 digits');
    } else {
      setUserError('');
    }
  };

  const handlePasswordChange = (value) => {
    // if (value.length <= 15) {
      setPassword(value);
    // }

    if (value.length > 15) {
      setPasswordError('Password should not be greater 15 characters');
    } else {
      setPasswordError('');
    }
  };
  const handleLogin = async () => {
    Keyboard.dismiss();
    try {
      const error = handleErrorValidate({userName, password});

      if (error) {
        return showToast(error);
      }
      setLoading(true);
      const response: any = await API_INSTANCE.post(`auth/login`, {
        userName: userName,
        password: password,
      });
      if (response?.data?.data) {
        const loginRes: any = await API_INSTANCE.get(
          `v1/family-member/fetch-member-details-by-mobilenumber?mobileNumber=${userName}`,
        );
        if (loginRes?.data?.data) {
          setUser(loginRes?.data?.data);
        }
      }else{
        showToast({
          message: response?.data?.message,
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
        setLoading(false);
      }
    } catch (error: any) {
      showToast({
        message: error?.response?.data?.description ?? error?.response?.data?.message,
        duration: 5000,
        status: 'error',
        slideFrom: 'right',
      });
      setLoading(false);
    }
  };

  const HandleParticipate = async () => {
    const error = handleErrorValidate({areaPincode, selectedParticipation});
    if (error) {
      return showToast(error);
    }
    dispatch(setGlobalPinCode(areaPincode));
    setLoading(true);
    try {
      const response: any = await API_INSTANCE.get(
        `/auth/filter-orphanage-by-algorithm?pincode=${areaPincode}&type=${selectedParticipation}`,
      );

      if (response?.data) {
        dispatch(orphanageDetails(response?.data));
        setLoading(false);
        navigation.navigate('orphanageDetailsScreen');
      }
    } catch (error: any) {
      setLoading(false);
      showToast({
        message: error?.response?.data?.message,
        duration: 5000,
        status: 'error',
        slideFrom: 'right',
      });
    }
  };
  useEffect(() => {
    dispatch(resetState());
  }, []);
  const _signup_section = () => {
    return (
      <>
        <View style={styles.inputSection}>
          <Text style={styles.inputAboveText}>Explore Home Around You Orphanages Nearby</Text>
          <TextInputComponent
            radius={16}
            height={50}
            value={areaPincode}
            onChange={setAreaPincode}
            textColor={theme.black}
            backgroundColor={theme.white}
            placeholder="Enter your location pincode"
            placeholderTextColor={theme.black}
            type="number"
          />
          <Text style={styles.inputAboveText}>Choose Your Family </Text>
          <View style={styles.participentSection}>
            <ParticipantComponent
              value={selectedParticipation}
              handleRadioSelect={handleRadioSelect}
            />
          </View>
        </View>
        <View style={styles.btnSection}>
             <TouchableOpacity style={styles.btnContainer} onPress={HandleParticipate}>
                <Text style={styles.btnText}>Show Nearby Home</Text>
              </TouchableOpacity>
          {/* <ButtonFieldComponent onPress={HandleParticipate} /> */}
        </View>
      </>
    );
  };

  const _login_section = () => {
    return (
      <>
        <View style={styles.loginContainer}>
           <TextInputComponent
        backgroundColor={theme.white}
        height={50}
        radius={16}
        placeholder="Mobile Number"
        placeholderTextColor={theme.black}
        textColor={theme.black}
        value={userName}
        onChange={handleUserNameChange}
        type="number"
      />
            {userError ? <Text style={{ color: 'red' }}>{userError}</Text> : null}
          <TextInputComponent
            backgroundColor={theme.white}
            height={50}
            radius={16}
            placeholder="Enter your password"
            placeholderTextColor={theme.black}
            textColor={theme.black}
            value={password}
            onChange={handlePasswordChange}
            type="password"
          />
          {passwordError ? <Text style={{ color: 'red'}}>{passwordError}</Text> : null}
          <Text style={styles.agreeText}>
            By continuing, I agree to the Terms of Use & Privacy Policy
          </Text>
          <View style={styles.loginBtn}>
            <ButtonFieldComponent onPress={() => handleLogin()} />
          </View>
          <Text style={styles.forgetPassword}> Forgot password? Get help</Text>
        </View>
      </>
    );
  };

  return (
    <ContainerProvider loading={loading}>
      <KeyboardAvoidingProvider>
        <ImageBackgroundProvider style={{flex: 1, paddingHorizontal: 16}}>
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/whitelogo.png')}
              style={styles.logoImage}
            />
          </View>
          <View style={styles.tabSection}>
            <TabViewComponent
              tabText={Object.values(AuthText)}
              tabHeight={50}
              radius={50}
              onTabChange={setSelectedTabText}
              initialText={selectedTabText}
            />
            {AuthText.signup === selectedTabText
              ? _signup_section()
              : _login_section()}
          </View>
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default StartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    height: 47,
    width: 182,
    borderRadius: 50,
    backgroundColor: COLOR.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: COLOR.white,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
  logoImage: {
    width: 120,
    height: 78,
  },
  tabSection: {
    flex: 1,
  },
  inputSection: {
    flex: 1,
    marginTop: 30,
    rowGap: 25,
  },
  participentSection: {
    flex: 1,
  },
  btnSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  loginBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  inputAboveText: {
    color: COLOR.white,
    fontSize: 14,
  },
  agreeText: {
    color: COLOR.white,
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
  },
  forgetPassword: {
    color: COLOR.white,
    fontSize: 12,
    textAlign: 'center',
    flex: 20,
  },
  loginContainer: {
    minHeight: 300,
    rowGap: 18,
    marginTop: 30,
  },
});
