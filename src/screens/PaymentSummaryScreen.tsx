import {Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import ContainerProvider from '../components/providers/ContainerProvider';
import ImageBackgroundProvider from '../components/providers/BackgroundGradiantProvider';
import {razorpayOptions} from '../entities/mockdata';
import CustomButtonField from '../components/fields/CustomButtonField';
import {theme} from '../utils/theme';
import RazorpayCheckout from 'react-native-razorpay';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {useAuthState} from '../context/AuthContext';
import API_INSTANCE from '../config/apiClient';
import {useToaster} from '../components/providers/ToasterProvider';

var options: any = {
  key: 'rzp_test_odA60UE7A67ZD7', // Enter the Key ID generated from the Dashboard
  amount: '', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: 'INR',
  name: 'Acme Corp', //your business name
  description: 'Test Transaction',
  image: 'https://example.com/your_logo',
  order_id: 'order_Qjlb5a2eKOPxC2', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  handler: function (response: any) {
    Alert.alert(response.razorpay_payment_id);
    Alert.alert(response.razorpay_order_id);
    Alert.alert(response.razorpay_signature);
  },
  prefill: {
    //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
    name: 'test split', //your customer's name
    email: 'gaurav.kumar@example.com',
    contact: '9000090000', //Provide the customer's phone number for better conversion rates
  },
  notes: {
    address: 'Razorpay Corporate Office',
  },
  theme: {
    color: '#3399cc',
  },
};

const PaymentSummaryScreen = () => {
  const route = useRoute();
  const {user, setUser}: any = useAuthState() ?? {};
  const {showToast} = useToaster();
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const registerData = useSelector((state: RootState) => state.authSlice);
  const {registerForm, memberData}: any = registerData ?? {};
  const [transactionId, setTransactionId] = useState<string>('Ref87654321');
  const {OrphanageDetails} = useSelector(
    (state: RootState) => state.orphanageDetails,
  );
  const {amount}: any = route.params;
  const {dataNew}: any = route.params;

  const handlePayPress = () => {
    // console.log(user);
    // setLoading(true);
    // setUser(...user, {regStatus: 'success'});
    onProceed();
    // RazorpayCheckout.open(options)
    //   .then(data => {
    //     // handle success
    //     console.log(`Success: ${data.razorpay_payment_id}`);
    //   })
    //   .catch(error => {
    //     // handle failure
    //     console.log(`Error: ${error.code} | ${error.description}`);
    //   });
  };

  const onProceed = async () => {
    // setLoading(true);
    const error = false;
    console.log(error);

    if (error) {
      setLoading(false);
      // return showToast(error);
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
          // console.log(
          //   `auth/signup/member?orphanageId=${Number(
          //     OrphanageDetails?.at(0)?.data?.orphanageId,
          //   )}&quantity=${Number(memberData?.length)}`,
          // );
          // console.log(`pay ${JSON.stringify(payload)}`);
          const response: any = await API_INSTANCE.post(
            `auth/signup/member?orphanageId=${Number(
              OrphanageDetails?.at(0)?.data?.orphanageId,
            )}&quantity=${Number(memberData?.length)}`,
            payload,
          );
          if (response?.data) {
            await API_INSTANCE.post(
              `auth/member-booking?orphanageId=${Number(
                OrphanageDetails?.at(0)?.data?.orphanageId,
              )}&quantity=${Number(memberData?.length)}`,
              payload,
            );
            let formattedPayload = [];
            for (let index = 0; index < memberData?.length; index += 1) {
              const [day, month, year] =
                memberData[index]?.bookingDate.split('/');
              const monthMap: any = {
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
              const [dayD, monthD, yearD] =
                memberData[index]?.memberNameBookedDob.split('/');
              const formattedDateDob = `${yearD}-${monthMap[monthD]}-${dayD}`;

              const res = {
                memberId: response?.data?.data.memberId,
                totalPaymentMade:
                  OrphanageDetails?.at(0)?.data?.mealAmountPerDay,
                bookingDate: formattedDateDob,
                orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId,
                memberNameBooked: memberData[index]?.memberNameBooked,
                memberNameBookedDob: formattedDateDob,
                memberNameBookedDescription:
                  memberData[index]?.memberBookedDescription,
              };
              formattedPayload.push(res);
            }
            // console.log('formatt', formattedPayload);
            await API_INSTANCE.post(`auth/member-booking`, formattedPayload);
            const userWithOrphanageId = {
              ...response?.data?.data, // Spread existing user data
              orphanageId: OrphanageDetails?.at(0)?.data?.orphanageId, // Add orphanageId to the user object
            };
            console.log(JSON.stringify(userWithOrphanageId));
            setLoading(false);
            navigation.navigate('paymentScreen', {
              user: userWithOrphanageId,
            });
          }
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
    }
  };

  const renderSummary = () => {
    return (
      <View style={styles.summaryContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '500',
            textAlign: 'center',
            marginVertical: 15,
          }}>
          Payment Summary
        </Text>
        {Object.entries(razorpayOptions).map(([key, value]) => (
          <View key={key} style={styles.rowContainer}>
            <View style={styles.keyContainer}>
              <Text style={styles.keyText}>{key}</Text>
            </View>
            <View style={styles.valueContainer}>
              {typeof value === 'object' ? (
                Object.entries(value).map(([subKey, subValue]) => (
                  <View key={subKey} style={styles.nestedRow}>
                    <Text style={styles.nestedKeyText}>{subKey}:</Text>
                    <Text style={styles.nestedValueText}>{subValue}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.valueText}>{value}</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ContainerProvider
      loading={loading}
      isModalVisible={isModalVisible}
      setModalVisible={setModalVisible}>
      <ImageBackgroundProvider style={styles.innerContainer}>
        <View style={styles.logoSection}>
          <Image
            source={require('../assets/images/whitelogo.png')}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.bodySection}>{renderSummary()}</View>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            paddingHorizontal: 20,
            marginVertical: 20,
          }}>
          <CustomButtonField
            buttonText="Pay"
            onPress={handlePayPress}
            style={{backgroundColor: theme.primary, borderRadius: 8}}
            textColor={theme.white}
            textStyle={{
              fontSize: 20,
              fontWeight: '700',
              textTransform: 'capitalize',
              letterSpacing: 0.3,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 12,
            }}
            opacity={1}
          />
        </View>
      </ImageBackgroundProvider>
    </ContainerProvider>
  );
};

export default PaymentSummaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  logoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 120,
  },
  logoImage: {
    width: 160,
    height: 86,
  },
  bodySection: {
    flex: 1,
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  summaryContainer: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  keyContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  valueContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  valueText: {
    fontSize: 16,
    color: '#666',
  },
  nestedRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  nestedKeyText: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  nestedValueText: {
    fontSize: 14,
    color: '#888',
    flex: 1,
  },
});
