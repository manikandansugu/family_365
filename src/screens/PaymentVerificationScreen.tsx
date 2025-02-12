import {Alert, Clipboard, Image, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import KeyboardAvoidingProvider from '../components/providers/KeyboardAvoidingProvider';
import {COLOR} from '../utils/colors';
import TextInputComponent from '../components/fields/TextInputComponent';
import {theme} from '../utils/theme';
import RadioButtonComponent from '../components/fields/RadioButtonComponent';
import CustomButtonField from '../components/fields/CustomButtonField';
import {useNavigation} from '@react-navigation/native';
import {useAuthState} from '../context/AuthContext';
import {
  handleIdentityValidation,
  handleTransactionValidation,
  OPEN_CAMERA,
  OPEN_GALLERY,
} from '../utils/helpers';
import {useToaster} from '../components/providers/ToasterProvider';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';
import API_INSTANCE from '../config/apiClient';

const PaymentVerificationScreen = ({route}) => {
  const {showToast} = useToaster();
  const navigation = useNavigation<any>();
  const registerData = useSelector((state: RootState) => state.authSlice);
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );
  const { dataNew } = route.params;
  const {registerForm, memberData}: any = registerData ?? {};
  console.log('registerForm',registerForm)
  console.log('OrphanageDetails',OrphanageDetails)
  console.log('memberData',memberData)
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
   const [transactionId, setTransactionId] = useState<string>();

  const [loading, setLoading] = useState(false);
  const [digitalPaymentId, setDigitalPaymentId] = useState<string>();

  useEffect(() => {
    if (OrphanageDetails?.length > 0) {
      setDigitalPaymentId(OrphanageDetails[0]?.data?.digitalPaymentId);
    }
  }, [OrphanageDetails]);
  
  const onProceed = async () => {
    setLoading(true);
    const error = handleTransactionValidation({
        transactionId,
    });
    console.log(error)

    if (error) {
      setLoading(false);
      return showToast(error);
    } else {
      let payload: any = {
        firstName: registerForm?.fullName,
        lastName: registerForm?.fullName?.slice(0, 4),
        middleName: '',
        userId: '',
        memberId: 0,
        mobileNumber: registerForm?.phoneNumber,
        addressLine1: registerForm?.address1,
        addressLine2: registerForm?.address2,
        city: registerForm?.city,
        state: registerForm?.state,
        pincode: registerForm?.pinCode,
        country: registerForm?.country,
        gender: registerForm?.gender,
        emailId: registerForm?.email,
        idNumber1: dataNew?.aadhar,
        // idType1: '',
        idNumber2: dataNew?.pan,
        profession: dataNew?.profession,
        bloodGroup: dataNew?.blood,
        // idType2: '',
        dateOfBirth: '1994-04-22',
        memberShipRegisteredDate: OrphanageDetails?.at(0)?.data?.regDate,
        interestIn: OrphanageDetails?.at(0)?.data?.type,
        memberOrphanageAssociationId: 0,
        sharePIData: true,
        paymentRefId: transactionId,

        totalAmountPaid:
          Number(memberData?.length) *
          Number(OrphanageDetails?.at(0)?.data?.mealAmountPerDay),
        groupBooking: memberData?.length > 1,
      };
      try {
        if (payload) {
          console.log(`auth/signup/member?orphanageId=${Number(
            OrphanageDetails?.at(0)?.data?.orphanageId,
          )}&quantity=${Number(memberData?.length)}`)
          console.log(`pay ${JSON.stringify(payload)}`)
          const response: any
           =
           await API_INSTANCE.post(
            `auth/signup/member?orphanageId=${Number(
              OrphanageDetails?.at(0)?.data?.orphanageId,
            )}&quantity=${Number(memberData?.length)}`,
            payload,
          );
          if (response?.data) {
            // await API_INSTANCE.post(
            //   `auth/member-booking?orphanageId=${Number(
            //     OrphanageDetails?.at(0)?.data?.orphanageId,
            //   )}&quantity=${Number(memberData?.length)}`,
            //   payload,
            // );
            let formattedPayload = [];
            for(let index = 0; index < memberData?.length; index += 1){
              const [day, month, year] = memberData[index]?.bookingDate.split('/');
const monthMap = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};
const formattedDate = `${year}-${monthMap[month]}-${day}`;
const [dayD, monthD, yearD] = memberData[index]?.memberNameBookedDob.split('/');
const formattedDateDob = `${yearD}-${monthMap[monthD]}-${dayD}`;

              const res =  {
                "memberId": response?.data?.data.memberId,
                "totalPaymentMade": OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
                "bookingDate": formattedDate,
                "orphanageId": OrphanageDetails?.at(0)?.data?.orphanageId,
                "memberNameBooked": memberData[index]?.memberNameBooked,
                "memberNameBookedDob": formattedDateDob,
                "memberNameBookedDescription": memberData[index]?.memberBookedDescription
              };
              formattedPayload.push(res);
            }
            console.log('formatt', formattedPayload)
            await API_INSTANCE.post(
             `auth/member-booking`,
             formattedPayload,
           );
            const userWithOrphanageId = {
              ...response?.data?.data, // Spread existing user data
              orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId, // Add orphanageId to the user object
            };
            console.log(JSON.stringify(userWithOrphanageId));
            setLoading(false);
            navigation.navigate('paymentScreen', {
              user: userWithOrphanageId
            });
          }
        }
      } catch (error: any) {
        console.log(error?.response?.data)
        setLoading(false);
        showToast({
          message: error?.response?.data?.message,
          duration: 5000,
          status: 'error',
          slideFrom: 'right',
        });
      }
    }
  };
  const costPerMember = OrphanageDetails?.at(0)?.data?.mealAmountPerDay ?? 0;
  const numberOfMembers = memberData?.length ?? 1;
  const totalCost = costPerMember * numberOfMembers;
  
  const _receiptSection = () => {
    return (
      <View style={styles.receiptContainer}>
        <Text style={styles.receiptHeading}>Receipt</Text>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Per Member Cost</Text>
          <Text style={styles.receiptValue}>{costPerMember}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Number of Members</Text>
          <Text style={styles.receiptValue}>{numberOfMembers}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Total</Text>
          <Text style={{
    fontSize: 14,
    // marginBottom: 10,
    color: COLOR.white,
    fontWeight: 'bold',
  }}>{totalCost}</Text>
        </View>
      </View>
    );
  };

  const _identityGroupSection = () => {
    // Copy to Clipboard Function
    const handleCopy = (text: string | undefined) => {
      Clipboard.setString(text ?? ''); // Copies text to clipboard
      Alert.alert('Copied', `${text} copied to clipboard`);
    };
  
    return (
      <View style={styles.idContainer}>
        <Text style={styles.idText}>Payment Verification</Text>
        {_receiptSection()}
        <Text style={styles.idTextT}>UPI ID</Text>
        {/* Profession Section */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={digitalPaymentId}
            editable={false} // Make it read-only
            placeholder="UPI Id"
            placeholderTextColor={COLOR.darkGray}
          />
          <TouchableOpacity
            style={styles.copyButton}
            onPress={() => handleCopy(digitalPaymentId)}
          >
            <Text style={styles.copyText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.idTextT}>Transaction ID</Text>
        {/* Next Input Box */}
        <TextInputComponent
          backgroundColor={theme.white}
          height={50}
          radius={10}
          type="text"
          placeholder="Transaction Id"
          placeholderTextColor={COLOR.darkGray}
          textColor={COLOR.black}
          onChange={setTransactionId}
          value={transactionId}
        />
      </View>
    );
  };

  const _buttonSection = () => {
    return (
      <CustomButtonField
        buttonText="Submit payment details"
        textColor={theme.white}
        style={styles.button}
        opacity={0.1}
        onPress={onProceed}
        textStyle={styles.buttonText}
      />
    );
  };

  return (
    <ContainerProvider
      loading={loading}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}>
      <KeyboardAvoidingProvider>
        <ImageBackgroundProvider style={styles.innerContainer}>
          <View style={styles.logoSection}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.logoImage}
            />
          </View>
          {_identityGroupSection()}
          {_buttonSection()}
        </ImageBackgroundProvider>
      </KeyboardAvoidingProvider>
    </ContainerProvider>
  );
};

export default PaymentVerificationScreen;

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    rowGap: 6,
    alignItems: 'center',
    paddingVertical: 20,
    resizeMode: 'cover',
    paddingHorizontal: 16,
  },
  idContainer: {
    padding: 16,
  },
  // idText: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  //   color: COLOR.black,
  // },
  idText: {
    fontSize: 18,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'center',
    marginBottom: 26,
  },
  receiptContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', 
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  receiptHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOR.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  receiptLabel: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: '600',
  },
  receiptValue: {
    fontSize: 14,
    color: COLOR.white,
    fontWeight: '600',
  },
  idTextT: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    backgroundColor: theme.white,
    borderColor: COLOR.darkGray,
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
    color: COLOR.black,
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: COLOR.seaGreen,
    borderRadius: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  copyText: {
    color: theme.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
  logoImage: {
    width: 120,
    height: 78,
  },

  // ID Section styles
  idContainer: {
    width: '100%',
    minHeight: 180,
  },
  // Note section styles
  noteContainer: {
    backgroundColor: '#7E4FF0',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: '100%',
  },
  textContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    columnGap: 5,
    width: '100%',
  },
  noteHeading: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 5,
    marginLeft: 10,
  },
  noteText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 5,
    lineHeight: 20,
  },
  noteContent: {
    marginHorizontal: 10,
  },

  // Consent section styles
  consentHeader: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    marginVertical: 12,
  },
  consentSubHeader: {
    fontSize: 14,
    fontWeight: 600,
    color: COLOR.white,
    textAlign: 'left',
    lineHeight: 20,
    marginBottom: 12,
  },
  consentTextContainer: {
    backgroundColor: '#7E4FF0',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    minHeight: 180,
    width: '100%',
  },
  boxContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  leftBox: {
    width: 90,
    height: 90,
    backgroundColor: COLOR.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    width: 90,
    height: 90,
    backgroundColor: COLOR.white,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  radioText: {
    fontSize: 14,
    color: COLOR.white,
  },

  // Button styles
  button: {
    backgroundColor: COLOR.black,
    height: 47,
    width: 210,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 'auto',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 600,
  },
});
